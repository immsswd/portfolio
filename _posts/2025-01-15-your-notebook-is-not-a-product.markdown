---
layout: default
title: "Your Notebook is Not a Product"
date: 2025-01-15 09:00:00 +0700
categories: Data Modelling
---

A notebook is a good place to ask questions of data. You can load a sample, check an assumption, and show a result while the context is still fresh. But a notebook that works once on one person's machine is not automatically something a team can depend on. It may rely on a local file, a hand-edited date, or a cell that only works after someone has run the cells above it in just the right order. This article offers a practical way to spot that gap and decide what needs to change before the analysis supports recurring reports or decisions.

{% include presentation-image.html src="/assets/img/post/notebook-to-product.svg" alt="Three steps from notebook exploration, through a defined and tested data model, to a repeatable pipeline with an owner; the result is a model teammates can reproduce and refresh." size="large" %}

The useful step is to make the decisions explicit. For an order model, say that `fct_order_lines` has one row per order line; define how returns and discounts affect `net_amount`; and make the key and required fields testable. A uniqueness check on `order_line_id`, a not-null check on the order date, and a comparison against the source row count can catch common mistakes before a dashboard quietly changes. Those details are part of the model, not polish to add later.

Turning the work into a product also means putting it where others can find and run it: version-controlled code, repeatable inputs, a schedule or documented run process, visible failures, and a named owner. If orchestration is not available yet, use a script with explicit input and date parameters, run the same data checks, save each output separately, and keep a log; document who runs it and what to do when a check fails. That manual process is a safer workaround than relying on notebook cell order, but it is not a replacement for scheduling and alerting. Keep the notebook if it helps explain the analysis, and use [Microsoft Learn's guide to star schema in Power BI](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema) for more on facts, dimensions, and model grain.
