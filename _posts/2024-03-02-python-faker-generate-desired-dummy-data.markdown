---
layout: default
title: "Python Faker, For Generating Desired Dummy Data"
date: 2025-03-02 14:10:51 +0700
categories: Data
---

The Python Faker library is a powerful tool for generating synthetic data. It is widely used for testing, bootstrapping databases, anonymizing sensitive information, and creating realistic datasets for development and analysis. By leveraging Faker, developers can produce diverse and customizable data, such as names, addresses, emails, and more, without compromising privacy.

## What is Python Faker?

- Faker is an open-source Python library designed to generate fake data for various purposes.
- It supports multiple locales, allowing users to create data in different languages and formats.

### Ease of Use: Simple installation

```powershell
pip install Faker
```

## Faker functions

The `Faker` library has **many functions** to generate different types of fake data. Below is a **comprehensive list** of useful Faker functions categorized by their purpose.

---

### **General Data**

| Function                | Description                       |
| ----------------------- | --------------------------------- |
| `fake.name()`           | Full name                         |
| `fake.first_name()`     | First name                        |
| `fake.last_name()`      | Last name                         |
| `fake.suffix()`         | Name suffix (e.g., Jr., Sr.)      |
| `fake.prefix()`         | Name prefix (e.g., Dr., Mr.)      |
| `fake.job()`            | Job title                         |
| `fake.company()`        | Company name                      |
| `fake.company_suffix()` | Company suffix (e.g., Inc., Ltd.) |
| `fake.catch_phrase()`   | Company tagline                   |

---

### **Contact & Personal Info**

| Function                           | Description                                 |
| ---------------------------------- | ------------------------------------------- |
| `fake.email()`                     | Email address                               |
| `fake.safe_email()`                | Email from safe domains (e.g., example.com) |
| `fake.free_email()`                | Free email (Gmail, Yahoo, etc.)             |
| `fake.user_name()`                 | Random username                             |
| `fake.password()`                  | Random password                             |
| `fake.phone_number()`              | Random phone number                         |
| `fake.msisdn()`                    | Mobile number                               |
| `fake.ssn()`                       | Social Security Number (US-style)           |
| `fake.iban()`                      | Random IBAN (bank account number)           |
| `fake.credit_card_number()`        | Fake credit card number                     |
| `fake.credit_card_provider()`      | Random credit card provider                 |
| `fake.credit_card_expire()`        | Expiration date for credit card             |
| `fake.credit_card_security_code()` | CVV number                                  |

---

### **Address & Location**

| Function                | Description           |
| ----------------------- | --------------------- |
| `fake.address()`        | Full address          |
| `fake.street_address()` | Street address        |
| `fake.street_name()`    | Street name           |
| `fake.city()`           | City name             |
| `fake.state()`          | US state name         |
| `fake.state_abbr()`     | US state abbreviation |
| `fake.postcode()`       | Zip or postal code    |
| `fake.country()`        | Country name          |
| `fake.country_code()`   | 2-letter country code |
| `fake.latitude()`       | Random latitude       |
| `fake.longitude()`      | Random longitude      |

---

### **Finance**

| Function                 | Description                    |
| ------------------------ | ------------------------------ |
| `fake.currency()`        | Random currency (code & name)  |
| `fake.currency_code()`   | Currency code (e.g., USD, EUR) |
| `fake.currency_name()`   | Currency name                  |
| `fake.bitcoin_address()` | Random Bitcoin wallet address  |
| `fake.iban()`            | Random IBAN                    |

---

### **Date & Time**

| Function               | Description                |
| ---------------------- | -------------------------- |
| `fake.date()`          | Random date (`YYYY-MM-DD`) |
| `fake.time()`          | Random time (`HH:MM:SS`)   |
| `fake.date_of_birth()` | Random birth date          |
| `fake.future_date()`   | Future date                |
| `fake.past_date()`     | Past date                  |
| `fake.date_time()`     | Random datetime object     |
| `fake.timezone()`      | Random timezone            |

---

### **Internet & Tech**

| Function             | Description                     |
| -------------------- | ------------------------------- |
| `fake.ipv4()`        | Random IPv4 address             |
| `fake.ipv6()`        | Random IPv6 address             |
| `fake.uri()`         | Random URI                      |
| `fake.url()`         | Random URL                      |
| `fake.domain_name()` | Random domain name              |
| `fake.domain_word()` | Random domain word              |
| `fake.slug()`        | Random slug (`my-awesome-post`) |
| `fake.uuid4()`       | Random UUID                     |
| `fake.mac_address()` | Random MAC address              |
| `fake.mime_type()`   | Random MIME type                |

---

### **Text & Lorem Ipsum**

| Function            | Description        |
| ------------------- | ------------------ |
| `fake.word()`       | Random word        |
| `fake.words()`      | List of words      |
| `fake.sentence()`   | Random sentence    |
| `fake.sentences()`  | List of sentences  |
| `fake.text()`       | Random paragraph   |
| `fake.paragraph()`  | Random paragraph   |
| `fake.paragraphs()` | List of paragraphs |

---

### **Government & IDs**

| Function               | Description                    |
| ---------------------- | ------------------------------ |
| `fake.ssn()`           | Social Security Number (US)    |
| `fake.license_plate()` | Vehicle license plate          |
| `fake.ein()`           | Employer Identification Number |

---

### **Miscellaneous**

| Function                                 | Description               |
| ---------------------------------------- | ------------------------- |
| `fake.boolean()`                         | True/False                |
| `fake.random_int(min, max)`              | Random integer            |
| `fake.random_digit()`                    | Random digit (0-9)        |
| `fake.random_element(["A", "B", "C"])`   | Random choice from a list |
| `fake.random_sample(["A", "B", "C"], 2)` | Random sample from a list |
| `fake.pystr(min_chars=5, max_chars=10)`  | Random string             |
| `fake.file_name(extension="pdf")`        | Random file name          |

---

### **Example: Generate a Fake User Profile**

```python
from faker import Faker

fake = Faker()

profile = {
    "name": fake.name(),
    "email": fake.email(),
    "phone": fake.phone_number(),
    "address": fake.address(),
    "company": fake.company(),
    "job": fake.job(),
    "dob": fake.date_of_birth(minimum_age=18, maximum_age=65),
}

print(profile)
```

---

## Usage (Case: Data Hospital Patient visits)

I am using this on `Jupyter lab`

Import library:

```python
import pandas as pd
import numpy as np
from faker import Faker
from datetime import datetime, timedelta
import random
```

Here are the full code, for generating the data and the types as well:

```python
# Initialize Faker
fake = Faker()

# Sample ICD-10 codes (add more as needed)
icd10_codes = [
    # PENYAKIT KRONIS
    # 🫀 Cardiovascular Diseases
    "I10",       # Essential (primary) hypertension
    "I25.10",    # Atherosclerotic heart disease
    "I50.9",     # Heart failure, unspecified
    "I67.2",     # Cerebral atherosclerosis
    "I69.30",    # Stroke, unspecified

    # 🍬 Diabetes & Endocrine Disorders
    "E11.9",     # Type 2 diabetes mellitus without complications
    "E10.9",     # Type 1 diabetes mellitus without complications
    "E11.65",    # Type 2 diabetes mellitus with hyperglycemia
    "E66.9",     # Obesity, unspecified
    "E03.9",     # Hypothyroidism, unspecified

    # 🫁 Respiratory Diseases
    "J44.9",     # Chronic obstructive pulmonary disease (COPD), unspecified
    "J45.909",   # Asthma, unspecified
    "J96.10",    # Chronic respiratory failure
    "J98.4",     # Other disorders of lung

    # 🩸 Kidney & Liver Diseases
    "N18.9",     # Chronic kidney disease, unspecified
    "N18.6",     # End-stage renal disease (ESRD)
    "K76.9",     # Liver disease, unspecified
    "K74.60",    # Cirrhosis of liver, unspecified

    # 🧠 Mental Health & Neurological Disorders
    "F20.9",     # Schizophrenia, unspecified
    "F32.9",     # Major depressive disorder, single episode, unspecified
    "F41.1",     # Generalized anxiety disorder
    "G20",       # Parkinson’s disease
    "G30.9",     # Alzheimer’s disease, unspecified

    # 🦴 Musculoskeletal & Autoimmune Disorders
    "M54.5",     # Low back pain
    "M19.90",    # Osteoarthritis, unspecified site
    "M32.9",     # Systemic lupus erythematosus (SLE), unspecified
    "M05.79",    # Rheumatoid arthritis, multiple sites

    # 🩹 Chronic Pain & Others
    "R52",       # Chronic pain, unspecified
    "K21.9",     # GERD (Gastroesophageal reflux disease)
    "C34.90",    # Lung cancer, unspecified
    # bpjs 144 faskes 1
    # 🦠 Infectious Diseases
    "A09",       # Infectious diarrhea
    "B34.9",     # Viral infection, unspecified
    "J00",       # Acute nasopharyngitis (common cold)
    "J06.9",     # Acute upper respiratory infection
    "A90",       # Dengue fever
    "A15.0",     # Tuberculosis of lung

    # 🫀 Cardiovascular & Metabolic
    "I10",       # Hypertension
    "I15.9",     # Secondary hypertension, unspecified
    "E11.9",     # Type 2 diabetes mellitus without complications
    "E66.9",     # Obesity, unspecified

    # 🫁 Respiratory System
    "J20.9",     # Acute bronchitis, unspecified
    "J44.9",     # Chronic obstructive pulmonary disease (COPD), unspecified
    "J45.909",   # Asthma, unspecified

    # 🍽 Digestive & Gastrointestinal
    "K21.9",     # GERD (Gastroesophageal reflux disease)
    "K29.7",     # Gastritis, unspecified
    "K52.9",     # Noninfective gastroenteritis and colitis

    # 🦴 Musculoskeletal & Pain Disorders
    "M54.5",     # Low back pain
    "M79.1",     # Myalgia
    "M19.90",    # Osteoarthritis, unspecified site

    # 🧠 Neurological & Mental Health
    "F32.9",     # Major depressive disorder, single episode
    "F41.1",     # Generalized anxiety disorder
    "G47.33",    # Sleep apnea

    # 🩺 Other Common Primary Care Conditions
    "R52",       # Chronic pain
    "Z71.3",     # Dietary counseling and surveillance
    "Z00.0",     # General medical examination

    # BPJS 144
    "003", #"Spontaneous abortion",
    "020", #"Threatened abortion",
    "033", #"Incomplete abortion",
    "034", #"Complete abortion",
    "091", #"Allergy status to food",
    "D50", #"Iron deficiency anemia",
    "099", #"Other maternal diseases classifiable elsewhere",
    "I20", #"Angina pectoris",
    "K35", #"Acute appendicitis",
    "M15", #"Osteoarthritis",
    "M05", #"Rheumatoid arthritis",
    "B77", #"Ascariasis",
    "J45", #"Asthma",
    "H52", #"Astigmatism",
    "G51", #"Bell’s palsy",
    "T17", #"Foreign body in respiratory tract",
    "T15", #"Foreign body in cornea",
    "H01", #"Blepharitis",
    "J20", #"Acute bronchitis",
    "H53", #"Night blindness",
    "I46", #"Cardiac arrest",
    "A09", #"Infectious gastroenteritis and colitis",
    "K21", #"GERD (Gastroesophageal reflux disease)",
    "H60", #"Otitis externa",
    "H66", #"Otitis media",
    "H10", #"Conjunctivitis",
    "A09", #"Diarrhea",
    "J06", #"Upper respiratory infection",
    "J02", #"Acute pharyngitis",
    "J03", #"Acute tonsillitis",
    "L03", #"Cellulitis of face",
    "H25", #"Senile cataract",
    "N30", #"Acute cystitis",
    "J01", #"Acute sinusitis",
    "H10", #"Allergic conjunctivitis",
    "H61", #"Diseases of external ear",
    "H54", #"Blindness in one eye",
    "H91", #"Hearing loss",
    "L02", #"Cutaneous abscess",
    "L02", #"Carbuncle",
    "L30", #"Infective dermatitis",
    "L30", #"Erythematous dermatitis",
    "B35", #"Tinea capitis",
    "B35", #"Tinea pedis",
    "B35", #"Tinea corporis",
    "B37", #"Candidiasis of skin",
    "L21", #"Seborrheic dermatitis",
    "L20", #"Atopic dermatitis",
    "L29", #"Pruritus",
    "L42", #"Pityriasis rosea",
    "L40", #"Psoriasis",
    "M54", #"Low back pain",
    "M54", #"Dorsalgia",
    "M25", #"Joint pain",
    "N39", #"Urinary tract infection",
    "N30", #"Cystitis",
    "N76", #"Acute vaginitis",
    "N76", #"Subacute and chronic vaginitis",
    "N76", #"Acute vulvitis",
    "N76", #"Subacute and chronic vulvitis",
    "N94", #"Dysmenorrhea",
    "N94", #"Premenstrual tension syndrome",
    "N92", #"Excessive or irregular menstruation",
    "N81", #"Pelvic organ prolapse",
    "B00", #"Herpes simplex",
    "B02", #"Zoster with nervous system involvement",
    "B02", #"Postherpetic neuralgia",
    "B02", #"Disseminated zoster",
    "B09", #"Viral skin infection",
    "L50", #"Urticaria",
    "L55", #"Sunburn",
    "L40", #"Psoriasis vulgaris",
    "L30", #"Other dermatitis",
    "L30", #"Dermatitis, unspecified",
    "L98", #"Prurigo",
    "L98", #"Skin ulcer",
    "R20", #"Hyperesthesia",
    "R51", #"Headache",
    "F41", #"Anxiety disorder",
    "G40", #"Epilepsy",
    "R42", #"Dizziness and giddiness",
    "R10", #"Pain in upper abdomen",
    "R10", #"Pelvic pain",
    "R10", #"Pain in lower abdomen",
    "R10", #"Other abdominal pain",
    "R11", #"Nausea and vomiting",
    "R12", #"Heartburn",
    "R13", #"Dysphagia",
    "R14", #"Flatulence",
    "R17", #"Jaundice",
    "R19", #"Abnormal feces",
    "R21", #"Rash",
    "R23", #"Spontaneous ecchymoses",
    "R25", #"Abnormal involuntary movements",
    "R26", #"Abnormal gait and mobility",
    "R29", #"Abnormal postures",
    "R30", #"Dysuria",
    "R32", #"Unspecified urinary incontinence",
    "R35", #"Polyuria",
    "R36", #"Urethral discharge",
    "R39", #"Genitourinary symptoms",
    "S00", #"Superficial injury of head",
    "S01", #"Open wound of head",
    "S02", #"Fracture of skull",
    "S03", #"Dislocation of joints of head",
    "S04", #"Injury of cranial nerves",
    "S06", #"Intracranial injury",
    "S07", #"Crushing injury of head",
    "S08", #"Traumatic amputation of head",
    "S09", #"Other injuries of head",
    "S13", #"Dislocation and sprain of neck",
    "S14", #"Injury of nerves and spinal cord at neck level",
    "S16", #"Injury of muscle at neck level",
    "S17", #"Crushing injury of neck",
    "S19", #"Other injuries of neck",
    "S20", #"Superficial injury of thorax",
    "S21", #"Open wound of thorax",
    "S22", #"Fracture of rib(s), sternum",
    "S23", #"Dislocation of thorax",
    "S24", #"Injury of spinal cord at thoracic level",
    "S25", #"Injury of blood vessels of thorax",
    "S26", #"Injury of heart",
    "S28", #"Crushing injury of thorax",
    "S29", #"Other injuries of thorax",
    "S30", #"Superficial injury of abdomen",
    "S31", #"Open wound of abdomen",
    "S32", #"Fracture of lumbar spine and pelvis",
    "S33", #"Dislocation of lumbar spine",
    "S34", #"Injury of spinal cord at lumbar level",
    "S35", #"Injury of blood vessels in abdomen",
    "S36", #"Injury of intra-abdominal organs",
    "S37", #"Injury of urinary organs",
    "S38", #"Traumatic amputation of abdomen",
    "S39", #"Other injuries of abdomen"

]


num_patients = 5000
patients = {
    i: {"first_name": fake.first_name(), "last_name": fake.last_name()}
    for i in range(1000, 1000 + num_patients)
}

# Function to generate inpatient visit data
def generate_inpatient_data(num_rows=100):
    data = []

    for _ in range(num_rows):
        admission_date = fake.date_between(start_date="-2y", end_date="today")
        length_of_stay = random.randint(1, 30)
        discharge_date = admission_date + timedelta(days=length_of_stay)
        admission_year = admission_date.year

        billing_amount = round(random.uniform(500, 50000), 2)
        insurance_covered = round(billing_amount * random.uniform(0.5, 1.0), 2)
        out_of_pocket = billing_amount - insurance_covered

        mortality_flag = random.choices([0, 1], weights=[95, 5])[0]
        readmission_flag = random.choices([0, 1], weights=[85, 15])[0]

        # Select a random patient
        patient_id = random.choice(list(patients.keys()))
        patient_info = patients[patient_id]

        data.append({
            "inpatient_id": fake.uuid4(),
            "admission_date": admission_date,
            "discharge_date": discharge_date,
            "admission_year": admission_year,
            "length_of_stay": length_of_stay,
            "hospital_id": random.randint(1, 20),
            "patient_id": patient_id,  # 🔥 Patient ID
            "first_name": patient_info["first_name"],  # 🔥 First Name
            "last_name": patient_info["last_name"],  # 🔥 Last Name
            "doctor_id": random.randint(500, 1000),
            "icd10_code": random.choice(icd10_codes),  # 🔥 BPJS and chronic ICD-10 Code
            "department_id": random.randint(1, 10),
            "bed_type": random.choice(["ICU", "General Ward", "Private Room", "Semi-Private"]),
            "billing_amount": billing_amount,
            "insurance_covered": insurance_covered,
            "out_of_pocket": out_of_pocket,
            "mortality_flag": mortality_flag,
            "readmission_flag": readmission_flag,
            "created_at": fake.date_time_this_decade(),
            "updated_at": fake.date_time_this_decade()
        })

    return pd.DataFrame(data)

# Generate 100 rows
df = generate_inpatient_data(10000)

# Save to CSV
df.to_csv("results/fact_inpatient_visits_with_names.csv", index=False)

print("✅ Fake inpatient data with patient names saved as 'fact_inpatient_visits_with_names.csv'")
print(df.head())  # Preview the first 5 rows
```

Go to **results/fact_inpatient_visits_with_names.csv** path to see generated file

## What 's next?

- Open your data and see the columns and data types
- Adjust the data based on your need
- For fact table, see the Dates column and ensure it is stick with `date` data type

Here is the result:
![rslt faker generated](/portfolio/assets/img/post/ss_1.jpg)
