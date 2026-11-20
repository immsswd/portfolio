---
layout: default
title: "Building a Healthcare Star Schema with PySpark"
date: 2024-12-15 09:00:00 +0700
categories: Analytics
---

A well-designed data model makes healthcare reporting easier to understand and maintain. This tutorial follows the same step-by-step sequence as the accompanying notebook: start with synthetic healthcare encounters, create patient/date/facility/diagnosis dimensions, then build and check an encounter fact table.

The examples use standard Markdown code fences, so they render as readable code blocks in this Jekyll site. The [Quarto notebook source]({{ '/notebooks/healthcare-star-schema-pyspark.qmd' | relative_url }}) can be rendered locally; this static site does not execute notebook cells in the browser. The post's CSV example expects de-identified data with the columns described below; it does not depend on a particular patient's data.

## 1. Start Spark and create sample data

The sample has one row per encounter and uses the columns below:

| Column                                    | Meaning                              |
| ----------------------------------------- | ------------------------------------ |
| `encounter_id`                            | Unique encounter identifier          |
| `patient_id`                              | Pseudonymous patient identifier      |
| `encounter_date`                          | Date of the encounter (`yyyy-MM-dd`) |
| `birth_date`, `gender`                    | Patient attributes                   |
| `facility_id`, `facility_name`            | Facility attributes                  |
| `admission_type`                          | Type of admission                    |
| `diagnosis_code`, `diagnosis_description` | Primary diagnosis                    |
| `length_of_stay`, `total_cost`            | Encounter measures                   |

Use only de-identified or synthetic data for this exercise. The patient IDs below are invented. In production, follow your organization's privacy requirements and use an approved de-identification approach.

```python
from datetime import date
from decimal import Decimal
import os
import sys

from pyspark.sql import SparkSession, Window
from pyspark.sql import functions as F
from pyspark.sql.types import (
    DateType,
    DecimalType,
    IntegerType,
    StringType,
    StructField,
    StructType,
)

os.environ["PYSPARK_PYTHON"] = sys.executable

spark = (
    SparkSession.builder
    .master("local[*]")
    .appName("healthcare-star-schema")
    .config("spark.driver.host", "127.0.0.1")
    .config("spark.driver.bindAddress", "127.0.0.1")
    .getOrCreate()
)

source_schema = StructType([
    StructField("encounter_id", StringType(), False),
    StructField("patient_id", StringType(), False),
    StructField("encounter_date", DateType(), False),
    StructField("birth_date", DateType(), True),
    StructField("gender", StringType(), True),
    StructField("facility_id", StringType(), True),
    StructField("facility_name", StringType(), True),
    StructField("admission_type", StringType(), True),
    StructField("diagnosis_code", StringType(), True),
    StructField("diagnosis_description", StringType(), True),
    StructField("length_of_stay", IntegerType(), True),
    StructField("total_cost", DecimalType(12, 2), True),
])

sample_rows = [
    ("E1001", "P001", date(2024, 12, 1), date(1985, 5, 12), "F", "H01", "North Clinic", "Emergency", "I10", "Hypertension", 2, Decimal("750.00")),
    ("E1002", "P002", date(2024, 12, 2), date(1972, 8, 24), "M", "H01", "North Clinic", "Elective", "E11.9", "Type 2 diabetes", 3, Decimal("1820.50")),
    ("E1003", "P001", date(2024, 12, 4), date(1985, 5, 12), "F", "H02", "West Hospital", "Emergency", "J18.9", "Pneumonia", 5, Decimal("3490.00")),
    ("E1004", "P003", date(2024, 12, 4), date(1990, 3, 9), "F", "H02", "West Hospital", "Urgent", "I10", "Hypertension", 1, Decimal("430.00")),
    ("E1005", "P002", date(2024, 12, 7), date(1972, 8, 24), "M", "H01", "North Clinic", "Emergency", "E11.9", "Type 2 diabetes", 2, Decimal("1275.25")),
]

raw = spark.createDataFrame(sample_rows, schema=source_schema)
raw.show(truncate=False)
```

For a CSV with the same columns, replace the `createDataFrame` line with:

```python
raw = (
    spark.read
    .option("header", True)
    .option("dateFormat", "yyyy-MM-dd")
    .schema(source_schema)
    .csv("data/healthcare_encounters.csv")
)
```

## 2. Clean and validate encounter rows

Normalize text values and require an encounter ID, patient key, and encounter date. In production, route rejected rows for review instead of silently dropping them.

```python
clean = (
    raw
    .withColumn("encounter_id", F.trim("encounter_id"))
    .withColumn("patient_id", F.trim("patient_id"))
    .withColumn("facility_id", F.trim("facility_id"))
    .withColumn("diagnosis_code", F.upper(F.trim("diagnosis_code")))
    .withColumn("gender", F.upper(F.trim("gender")))
    .withColumn("admission_type", F.trim("admission_type"))
    .withColumn("diagnosis_description", F.trim("diagnosis_description"))
)

valid_encounters = clean.filter(
    F.col("encounter_id").isNotNull()
    & (F.col("encounter_id") != "")
    & F.col("patient_id").isNotNull()
    & (F.col("patient_id") != "")
    & F.col("encounter_date").isNotNull()
)

rejected_count = clean.count() - valid_encounters.count()
print(f"Rows rejected for missing encounter keys or date: {rejected_count}")
```

Check that each encounter appears only once before building the fact table:

```python
duplicate_encounters = (
    valid_encounters
    .groupBy("encounter_id")
    .count()
    .filter(F.col("count") > 1)
)

if duplicate_encounters.limit(1).count() > 0:
    raise ValueError("Source data contains duplicate encounter_id values")
```

## 3. Create dimension tables

Each dimension gets an integer surrogate key. This batch example assigns keys in natural-key order and checks for conflicting attributes. For production loads, persist key mappings so existing members keep their keys; use a slowly changing dimension design if you need to retain historical attribute changes.

The helper below creates one dimension row per natural key:

```python
def make_dimension(frame, natural_key, attributes, surrogate_key):
    members = frame.select(natural_key, *attributes).dropDuplicates()
    conflicts = (
        members
        .groupBy(natural_key)
        .count()
        .filter(F.col("count") > 1)
    )

    if conflicts.limit(1).count() > 0:
        raise ValueError(f"Conflicting attributes found for {natural_key}")

    key_order = Window.orderBy(natural_key)

    return (
        members
        .withColumn(surrogate_key, F.row_number().over(key_order))
        .select(surrogate_key, natural_key, *attributes)
    )


dim_patient = make_dimension(
    valid_encounters,
    "patient_id",
    ["birth_date", "gender"],
    "patient_key",
)

dim_facility = make_dimension(
    valid_encounters,
    "facility_id",
    ["facility_name"],
    "facility_key",
)

dim_diagnosis = make_dimension(
    valid_encounters,
    "diagnosis_code",
    ["diagnosis_description"],
    "diagnosis_key",
)

dim_patient.orderBy("patient_key").show(truncate=False)
dim_facility.orderBy("facility_key").show(truncate=False)
dim_diagnosis.orderBy("diagnosis_key").show(truncate=False)
```

Create the date dimension with one row per calendar date in the encounter range:

```python
date_bounds = valid_encounters.agg(
    F.min("encounter_date").alias("min_date"),
    F.max("encounter_date").alias("max_date"),
)

dim_date = (
    date_bounds
    .select(
        F.explode(
            F.sequence(
                F.col("min_date"),
                F.col("max_date"),
                F.expr("INTERVAL 1 DAY"),
            )
        ).alias("calendar_date")
    )
    .withColumn("date_key", F.date_format("calendar_date", "yyyyMMdd").cast("int"))
    .withColumn("year", F.year("calendar_date"))
    .withColumn("quarter", F.quarter("calendar_date"))
    .withColumn("month", F.month("calendar_date"))
    .withColumn("day", F.dayofmonth("calendar_date"))
    .select("date_key", "calendar_date", "year", "quarter", "month", "day")
)

dim_date.orderBy("calendar_date").show(truncate=False)
```

If diagnosis or facility values are missing, define a consistent “Unknown” dimension member as part of your data-quality policy before production use.

## 4. Build the encounter fact table

The grain of `fact_encounter` is one row per encounter. The joins replace natural keys with dimension keys, while the select list keeps patient identifiers out of the analytical fact table.

```python
patient_keys = dim_patient.select("patient_id", "patient_key")
facility_keys = dim_facility.select("facility_id", "facility_key")
diagnosis_keys = dim_diagnosis.select("diagnosis_code", "diagnosis_key")
date_keys = dim_date.select("calendar_date", "date_key")

e = valid_encounters.alias("e")
p = patient_keys.alias("p")
f = facility_keys.alias("f")
d = diagnosis_keys.alias("d")
dt = date_keys.alias("dt")

fact_encounter = (
    e
    .join(p, F.col("e.patient_id") == F.col("p.patient_id"), "inner")
    .join(f, F.col("e.facility_id") == F.col("f.facility_id"), "left")
    .join(d, F.col("e.diagnosis_code") == F.col("d.diagnosis_code"), "left")
    .join(dt, F.col("e.encounter_date") == F.col("dt.calendar_date"), "inner")
    .select(
        F.col("e.encounter_id"),
        F.col("p.patient_key"),
        F.col("dt.date_key"),
        F.col("f.facility_key"),
        F.col("d.diagnosis_key"),
        F.col("e.admission_type"),
        F.col("e.length_of_stay"),
        F.col("e.total_cost"),
    )
)

fact_encounter.orderBy("encounter_id").show(truncate=False)
```

## 5. Check and save the star schema

Compare the fact row count with the validated source count, then write each table in a columnar format such as Parquet. The `errorifexists` mode prevents a rerun from silently overwriting existing output.

```python
if fact_encounter.count() != valid_encounters.count():
    raise ValueError("Fact row count does not match the validated encounter count")

output_path = "output/healthcare_star_schema"

dim_patient.write.mode("errorifexists").parquet(f"{output_path}/dim_patient")
dim_facility.write.mode("errorifexists").parquet(f"{output_path}/dim_facility")
dim_diagnosis.write.mode("errorifexists").parquet(f"{output_path}/dim_diagnosis")
dim_date.write.mode("errorifexists").parquet(f"{output_path}/dim_date")
fact_encounter.write.mode("errorifexists").parquet(f"{output_path}/fact_encounter")
```

The resulting model is a star: `fact_encounter` sits in the middle, connected to the patient, date, facility, and diagnosis dimensions. Analysts can now group encounters, length of stay, and cost by time period, facility, or diagnosis without repeatedly reshaping the source file.

## Practical considerations

- **Protect patient data:** use approved de-identification and access controls; avoid putting direct identifiers in analytical tables.
- **Define the grain:** document what one fact row represents before adding measures or joins.
- **Handle changing attributes:** if patient or facility history matters, use a deliberate slowly changing dimension strategy instead of overwriting dimension values.
- **Keep keys stable:** persist surrogate-key mappings across loads; the example's batch-generated keys are not an incremental-load strategy.
- **Quarto rendering:** the `.qmd` source can be executed during a local Quarto render. The Jekyll post displays its own Markdown walkthrough and does not execute code in the browser.
