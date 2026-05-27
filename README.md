# offshore_leaks_project_Naniko_Kakonashvili
# Georgian Oligarchs and Offshore Finance
### QSS 20 Final Project — Milestone 1
**Author:** Kakonashvili  
**Professor:** Chang  
**Last updated:** May 2026

---

## Project Summary

This project investigates how Georgian elites use offshore financial 
networks to structure and protect their wealth, asking whether their 
strategies more closely resemble Russian oligarchs (maximizing opacity) 
or Western European actors (optimizing for tax efficiency within 
nominally transparent frameworks). The central question is whether the 
shared Soviet legacy of weak property rights and chaotic privatization 
induces a distinct "post-Soviet" pattern of wealth concealment that 
persists even as states like Georgia formally orient toward Western 
institutions.

The analysis uses the ICIJ Offshore Leaks Database alongside Russian 
and European officers as comparative reference groups. Bidzina 
Ivanishvili, billionaire founder of the ruling Georgian Dream party and 
a figure appearing in both the Panama Papers and the Pandora Papers, 
serves as the anchor case.



# Data

The raw data is not stored in this GitHub repository because the ICIJ Offshore Leaks CSV files are too large for GitHub.

The data can be downloaded from the International Consortium of Investigative Journalists Offshore Leaks Database:

https://offshoreleaks.icij.org/pages/database

After downloading and unzipping the data, place the CSV files locally in:

data/raw/full-oldb.LATEST/

Expected files:

- nodes-entities.csv
- nodes-officers.csv
- nodes-addresses.csv
- nodes-intermediaries.csv
- relationships.csv
- nodes-others.csv

# Code directory

### `code/01_data_inventory.ipynb`
Loads the five ICIJ CSV files and performs the core data pipeline:
filters `nodes-officers.csv` for Georgian-coded actors (`country_codes` 
containing `GEO`), joins through `relationships.csv` to linked offshore 
entities, and pulls jurisdiction and incorporation date data from 
`nodes-entities.csv`. Produces both starter visualizations saved to 
`output/`.


## Key Findings (Milestone 1)

- Georgian officers show a hybrid jurisdiction pattern: heavy BVI use 
  (46% of linked entities, similar to Russia) alongside unusually high 
  Malta use (26%, closer to EU levels), suggesting a dual-track offshore 
  strategy.
- Opaque haven incorporations peak in 2014, coinciding with the 
  consolidation of Georgian Dream's political dominance.
- 281 Georgian-coded officers and 223 linked entities identified in the 
  full ICIJ database.

---

## to-do:

Planned additions include integration of the World Bank Worldwide 
Governance Indicators (WGI) for temporal contextualization, the Tax 
Justice Network Financial Secrecy Index (FSI) for continuous 
jurisdiction scoring, fuzzy name matching to link Georgian officers 
across leaks, and intermediary network analysis to test for shared 
offshore infrastructure between Georgian and Russian actors.
