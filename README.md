# Offshore in the Gray Zone: Georgian Elites and Post-Soviet Capital
### QSS 20 Final Project — Naniko Kakonashvili

**Research question:** Do post-Soviet offshore actors from small, geopolitically ambiguous states manage offshore wealth like Russian oligarchs or like their Western European counterparts?

**Data:** ICIJ Offshore Leaks Database (Panama Papers, Pandora Papers, Paradise Papers, Bahamas Leaks, Offshore Leaks) — 810,000+ entities, 200 countries, coverage through ~2020.

---

## Repository structure

```
project_root/
├── code/
│   └── 01_analysis_and_visualizations.ipynb   ← main analysis notebook
├── data/
│   └── raw/
│       └── full-oldb.LATEST/                  ← ICIJ CSVs (not tracked; see below)
│           ├── nodes-officers.csv
│           ├── nodes-entities.csv
│           ├── nodes-intermediaries.csv
│           ├── relationships.csv
│           ├── nodes-addresses.csv
│           └── nodes-others.csv
└── output/
    ├── viz1_jurisdiction_profile.png
    ├── viz2_georgian_timeline.png
    ├── viz3_similarity_networks.png
    └── viz4_radar_chart.png
```

**Raw data is not tracked in this repo** because the ICIJ files are ~1 GB unzipped. Download and unzip the full database from [offshoreleaks.icij.org/pages/database](https://offshoreleaks.icij.org/pages/database) and place the CSV files in `data/raw/full-oldb.LATEST/`. The notebook auto-detects several common local paths (see below).

---

## Scripts / notebooks

### [`code/01_analysis_and_visualizations.ipynb`](code/01_analysis_and_visualizations.ipynb)

**The single analysis notebook.** Numbered sections correspond to the logical flow:

| Section | What it does | Input | Output |
|---|---|---|---|
| 1 – Setup & data loading | Resolves the raw data path across common local locations (repo-relative, Desktop, Downloads, macOS Google Drive); loads the four ICIJ CSVs | `data/raw/full-oldb.LATEST/*.csv` | DataFrames: `officers`, `entities`, `relationships`, `intermediaries` |
| 2 – Data inventory & schema | Prints column lists and head rows for each file; audits Georgian-coded officers by source leak | Same DataFrames | Printed diagnostics (281 Georgian officers across 10 source providers) |
| 3 – Constants & helpers | Defines country groups, jurisdiction classification sets (BLACKLIST, EU_ADJACENT), color palette, and three helper functions: `get_country_data()`, `shannon_entropy()`, `herfindahl()` | — | Functions and constants used by all downstream sections |
| 4 – Feature vector construction | For each of 6 countries (GEO, LVA, BLR, RUS, DEU, FRA), computes 5 features: blacklist %, Shannon entropy of jurisdiction distribution, intermediary HHI, EU-adjacent %, and normalized mean incorporation year; min-max normalizes for cosine similarity; computes Georgia vs. all pairwise cosine similarities | `officers`, `entities`, `relationships` | `features_df`, `norm_df`, `sim_df` (Georgia–Russia: 0.661; Georgia–EU avg: 0.447) |
| 5 – Viz 1: Jurisdiction profile | Grouped bar chart comparing jurisdiction shares across Georgia, Russia, Germany, France | `features_df` + raw entity data | `output/viz1_jurisdiction_profile.png` |
| 6 – Viz 2: Georgian timeline | Stacked bar chart of annual entity incorporations, colored by opaque/semi-transparent/other, with political event annotations | Georgian entity slice | `output/viz2_georgian_timeline.png` |
| 7 – Viz 3: Similarity network | NetworkX graph; edges at cosine similarity ≥ 0.70; node size ∝ entity count | `norm_df`, `features_df` | `output/viz3_similarity_networks.png` |
| 8 – Viz 4: Radar chart | Normalized feature vectors plotted as radar/spider chart for all 6 countries | `norm_df` | `output/viz4_radar_chart.png` |

---

## Data path resolution

The notebook tries the following paths in order and uses the first one that exists:

1. `<project_root>/data/raw/full-oldb.LATEST/` (repo-relative — preferred)
2. `~/Desktop/offshore_leaks_project/data/raw/full-oldb.LATEST/`
3. `~/Downloads/offshore_leaks_project/data/raw/full-oldb.LATEST/`
4. Any matching path under `~/Library/CloudStorage/` (macOS Google Drive)

If none are found, the notebook raises a `FileNotFoundError` with a message listing all searched paths.

---

## Key variables

| Variable | Source field | Role |
|---|---|---|
| `country_codes` | `nodes-officers.csv` | ISO-3 code used to filter officers by nationality |
| `jurisdiction_description` | `nodes-entities.csv` | Primary analytical variable; classified into BLACKLIST / EU_ADJACENT / other |
| `incorporation_date` | `nodes-entities.csv` | Parsed with `format='mixed'` to handle heterogeneous date formats across leaks |
| `rel_type == 'officer_of'` | `relationships.csv` | Links officers to their offshore entities |
| `rel_type == 'intermediary_of'` | `relationships.csv` | Links intermediaries (law firms, registered agents) to entities; used for HHI |

---

## Environment

```
Python 3.13
pandas
numpy
matplotlib
networkx
scipy
```
---

## Outputs

All four figures are saved to `output/` as 150 DPI PNGs. They are also embedded in the paper (`kakonashvili_offshore_georgia.tex`).

| File | Description |
|---|---|
| `viz1_jurisdiction_profile.png` | Grouped bar: jurisdiction shares by nationality across BVI, Malta, Seychelles, Bahamas, Bermuda, Cayman, Samoa, Panama |
| `viz2_georgian_timeline.png` | Stacked bar: Georgian entity incorporations 1991–2018 by jurisdiction type with political event markers |
| `viz3_similarity_networks.png` | Similarity network: cosine ≥ 0.70 threshold, node size ∝ entities |
| `viz4_radar_chart.png` | Radar chart: 5-dimensional normalized strategy fingerprints for all 6 countries |

---

## Key findings (summary)

- Georgia's BVI share (46%) approaches Russia's (55%); Georgia's Malta share (26%) is more than double Russia's (11%) and approaches EU levels — a **dual-track strategy** absent in any comparison country.
- Cosine similarity confirms Georgia is structurally closer to **Russia (0.661) than to the EU average (0.447)**, with the strongest resemblance to Belarus (0.932).
- Georgian entity incorporations peak in **2014** (16 opaque entities) alongside Georgian Dream's political consolidation; post-2016 decline is consistent with a Panama Papers chilling effect.
- Georgia's **intermediary HHI (0.068)** is the highest in the comparison set — more than twice Russia's (0.024) — indicating offshore structuring concentrated in a narrow set of wealth managers.
