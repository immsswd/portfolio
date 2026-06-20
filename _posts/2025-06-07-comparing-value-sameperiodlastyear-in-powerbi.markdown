---
layout: default
title: "Comparing Value Current Year or Selected Year vs Year Before in Power BI"
date: 2025-06-07 07:09:51 +0700
categories: Analytics
---

In data analytics, one of the first questions stakeholders ask is:

> “How is our revenue doing compared to last year?”

This comparison is essential because raw numbers alone are not enough.
A revenue of 10 million may look good, but without knowing how it performed against the same period last year, it has no real business meaning.

SAMEPERIODLASTYEAR = _“Give me the same dates as now, but exactly one year earlier, so I can do Year-over-Year analysis.”_

In tools like Microsoft Power BI, analysts frequently compare:

- Actual revenue (current year)
- Revenue from the same period last year

This approach removes seasonality bias.
For example, comparing December this year vs December last year is far more meaningful than comparing December vs November.

To solve this common analytical case—**Year-over-Year (YoY)** comparison—Power BI provides built-in time intelligence functions, with **SAMEPERIODLASTYEAR** being the most commonly used.

## How to use it?

Basic syntax

```dax
SAMEPERIODLASTYEAR ( DimDate[Date] )
```

Current year revenue:

```dax
Revenue AC = SUM(Fact_Summarized[Revenue])
```

Now we compare Actual Revenue to last Year with same month's period revenue

```dax
Revenue PY =
CALCULATE(
    [Revenue AC],
    SAMEPERIODLASTYEAR(DIM_Date[Date]),
    ALL(DIM_Date) -- remove filter context for all date (not filtered)
)
```

then put the `Revenue AC` and `Revenue PY` into power bi Matrix table, here is the form

![comparing revenue](/portfolio/assets/gif/79b4e55239e55e3f.gif)

## Synonyms / alternative syntax (same result)

DATEADD

```dax
Revenue PY =
CALCULATE (
    [Revenue AC],
    DATEADD ( DimDate[Date], -1, YEAR )
)
```

PARALLELPERIOD (older style)

```dax
Revenue PY=
CALCULATE (
    [Revenue AC],
    PARALLELPERIOD ( DimDate[Date], -1, YEAR )
)
```

By implementing **Year-over-Year** analysis using `SAMEPERIODLASTYEAR`, organizations can move beyond reporting raw numbers and gain meaningful business context. Decision-makers can quickly identify growth trends, seasonal patterns, and performance changes that may otherwise be hidden within transactional data.

This type of analysis helps business leaders evaluate whether strategic initiatives are producing results, assess revenue growth objectively, and make more informed decisions based on historical performance. For data analysts, YoY metrics provide a standardized way to measure business performance and communicate insights that are easier for stakeholders to understand and act upon.
