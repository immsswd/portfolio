# Imam's portfolio

A Jekyll portfolio with a category-and-year post explorer and support for
locally rendered Quarto/PySpark notebook sources.

## Run locally

Install Ruby dependencies with `bundle install`. To execute and render the
healthcare notebook locally, install Python dependencies and Quarto, and set
`JAVA_HOME` to a Java 17 JDK. Then run these commands in PowerShell:

```powershell
python -m pip install -r requirements-notebooks.txt
quarto render notebooks\healthcare-star-schema-pyspark.qmd --execute-dir "$env:TEMP"
bundle exec jekyll serve
```

The healthcare post includes a Markdown walkthrough and links to the Quarto
source. GitHub Pages does not run notebook cells in the browser; Quarto executes
the source on the local machine when you render it.
