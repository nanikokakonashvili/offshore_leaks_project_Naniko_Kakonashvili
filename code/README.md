# Code

## `01_analysis_and_visualizations.ipynb`

Main reproducible analysis notebook for the offshore leaks project. It is numbered first because it is the only analysis file and should be run from top to bottom.

**Inputs:** raw ICIJ Offshore Leaks CSV files in `data/raw/full-oldb.LATEST/`, especially `nodes-officers.csv`, `nodes-entities.csv`, `nodes-intermediaries.csv`, and `relationships.csv`.

**What it does:** loads the ICIJ graph files, filters officers by country code, links officers to offshore entities through `officer_of` relationships, classifies entity jurisdictions, computes country-level strategy features, and builds the similarity analysis.

**Outputs:** four PNG figures written to `output/`: jurisdiction profile, Georgian incorporation timeline, similarity network, and radar chart.
