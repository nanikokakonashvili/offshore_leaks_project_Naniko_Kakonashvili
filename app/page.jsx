"use client";

import { useState } from "react";

const figures = {
  jurisdiction: {
    label: "Jurisdictions",
    src: "/assets/viz1_jurisdiction_profile.png",
    alt: "Grouped bar chart comparing offshore jurisdiction shares for Georgia, Russia, Germany, and France.",
    caption:
      "Georgia combines a high BVI share with a high Malta share, pairing opaque havens with EU-adjacent routing."
  },
  timeline: {
    label: "Timeline",
    src: "/assets/viz2_georgian_timeline.png",
    alt: "Stacked bar chart of Georgian-linked offshore incorporations by year and jurisdiction type.",
    caption:
      "Georgian-linked incorporations peak in 2014, with opaque-haven use rising after 2006 and declining after 2016."
  },
  network: {
    label: "Network",
    src: "/assets/viz3_similarity_networks.png",
    alt: "Network diagram showing cosine similarity between country offshore strategy vectors.",
    caption:
      "At the 0.70 threshold, Georgia links strongly to Belarus and Latvia, but not directly to Russia or EU anchors."
  },
  radar: {
    label: "Fingerprints",
    src: "/assets/viz4_radar_chart.png",
    alt: "Radar chart of normalized offshore strategy fingerprints for six countries.",
    caption:
      "Georgia is wide on blacklist share and intermediary concentration while still extending toward EU-adjacent share."
  }
};

const stats = [
  ["223", "Georgian-linked entities"],
  ["55.2%", "Georgia blacklist share"],
  ["28.7%", "Georgia EU-adjacent share"],
  ["0.93", "Georgia-Belarus similarity"]
];

const dataCards = [
  {
    title: "Source",
    text:
      "The project uses the ICIJ Offshore Leaks Database, combining Offshore Leaks, Panama Papers, Bahamas Leaks, Paradise Papers, and Pandora Papers."
  },
  {
    title: "Unit",
    text:
      "The analysis unit is an offshore entity linked to an officer nationality through an officer_of relationship."
  },
  {
    title: "Scope",
    text:
      "Six comparison countries are used: Georgia, Latvia, Belarus, Russia, Germany, and France. Georgian timeline analysis covers 1991-2018."
  },
  {
    title: "Limit",
    text:
      "The data are leaked records, not a census. Country codes reflect document entries rather than verified citizenship, and 16.1% of Georgian-linked entities lack parseable incorporation dates."
  }
];

const pipeline = [
  ["Link officers to entities", "Filter officers by ISO-3 country code, then join to entities through officer_of edges."],
  ["Classify jurisdictions", "Group entity jurisdictions into blacklisted, EU-adjacent, and other categories."],
  [
    "Build features",
    "Compute blacklist share, jurisdiction entropy, intermediary HHI, EU-adjacent share, and temporal recency."
  ],
  ["Compare strategies", "Min-max normalize each feature and compute cosine similarity across countries."]
];

export default function HomePage() {
  const [activeFigure, setActiveFigure] = useState("jurisdiction");
  const figure = figures[activeFigure];

  return (
    <>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Offshore in the Gray Zone home">
          <span className="brandMark" aria-hidden="true" />
          <span>Offshore in the Gray Zone</span>
        </a>
        <nav className="nav" aria-label="Project sections">
          <a href="#question">Question</a>
          <a href="#data">Data</a>
          <a href="#method">Method</a>
          <a href="#results">Results</a>
          <a href="#takeaway">Takeaway</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="heroCopy">
            <p className="eyebrow">QSS 20 final project</p>
            <h1 id="hero-title">
              How Georgian-linked offshore actors mix Russian-style secrecy with EU-adjacent routing
            </h1>
            <p className="lede">
              This project compares Georgia with Russia, Belarus, Latvia, Germany, and France in the ICIJ
              Offshore Leaks Database to ask whether a small post-Soviet state follows a Russian, European, or
              hybrid offshore strategy.
            </p>
          </div>
          <div className="heroFigure">
            <img src={figures.jurisdiction.src} alt={figures.jurisdiction.alt} />
          </div>
        </section>

        <section className="stats" aria-label="Project summary statistics">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section id="question" className="section split">
          <div>
            <p className="eyebrow">Question</p>
            <h2>Does Georgia look like Russia, Western Europe, or neither?</h2>
          </div>
          <div className="sectionCopy">
            <p>
              Offshore finance research often compares many countries at once. This project zooms in on Georgia,
              a post-Soviet state with strong EU aspirations and elite wealth networks shaped by the same 1990s
              privatization environment that produced Russian oligarchic capital.
            </p>
            <p>
              The empirical puzzle is whether Georgian-linked offshore behavior clusters with Russia&apos;s opaque
              haven strategy, with EU economies&apos; regulated-tax-jurisdiction strategy, or with a distinctive
              dual-track pattern.
            </p>
          </div>
        </section>

        <section id="data" className="section dataBand">
          <div className="sectionHeading">
            <p className="eyebrow">Data</p>
            <h2>ICIJ Offshore Leaks as a country-linked entity graph</h2>
          </div>
          <div className="dataGrid">
            {dataCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="method" className="section methodSection">
          <div className="sectionHeading">
            <p className="eyebrow">Method</p>
            <h2>Convert offshore behavior into comparable strategy vectors</h2>
          </div>
          <ol className="pipeline">
            {pipeline.map(([title, text], index) => (
              <li key={title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="results" className="section resultsSection">
          <div className="sectionHeading">
            <p className="eyebrow">Results</p>
            <h2>Four views of the same hybrid pattern</h2>
          </div>

          <div className="figureSwitcher" aria-label="Result figures">
            <div className="figureTabs" role="tablist" aria-label="Choose result figure">
              {Object.entries(figures).map(([key, item]) => (
                <button
                  className={activeFigure === key ? "active" : ""}
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeFigure === key}
                  onClick={() => setActiveFigure(key)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <figure className="resultFigure">
              <img src={figure.src} alt={figure.alt} />
              <figcaption>{figure.caption}</figcaption>
            </figure>
          </div>
        </section>

        <section id="takeaway" className="section takeaway">
          <div>
            <p className="eyebrow">Takeaway</p>
            <h2>Georgia is not simply Russian or European in its offshore behavior.</h2>
          </div>
          <div className="takeawayCopy">
            <p>
              The descriptive evidence points to a dual-track strategy: Georgian-linked actors use high-secrecy
              jurisdictions at rates close to Russia while also routing through EU-adjacent jurisdictions at much
              higher rates than Russia.
            </p>
            <p>
              The strongest similarity is with Belarus, but Georgia&apos;s elevated intermediary concentration and
              EU-adjacent share make it distinct from both Russia and Western European anchors.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Naniko Kakonashvili | QSS 20 | ICIJ Offshore Leaks Database</p>
        <a href="https://offshoreleaks.icij.org/pages/database">ICIJ data source</a>
      </footer>
    </>
  );
}
