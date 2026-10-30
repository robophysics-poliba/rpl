import type { Metadata } from "next";
import Link from "next/link";

import {
  Figure,
  FigurePair,
  FundingBox,
  PublicationList,
  Result,
  Team,
  Video,
} from "@/components/project";
import { Container, OfflineNotice } from "@/components/ui";
import { projects, references } from "@/lib/data/projects";
import { getPapers, getPeople, getResearchLines } from "@/lib/queries";
import { sourceFor } from "@/lib/sources";

/**
 * Progetto ERC RoboFluid. Dati del grant e obiettivi da CORDIS
 * (cordis.europa.eu/project/id/101116856); risultati dagli articoli, nelle
 * versioni ad accesso libero su Zenodo.
 */

const description =
  "ERC Starting Grant RoboFluid (2024–2028): robotic fluids for artificial muscles, wearable cooling and active textiles, at the RoboPhysics Laboratory, Politecnico di Bari.";

export const metadata: Metadata = {
  title: "ERC RoboFluid",
  description,
  alternates: { canonical: "/research/robofluid" },
  openGraph: { title: "ERC RoboFluid — RoboPhysics Laboratory", description },
};

const CORDIS = "https://cordis.europa.eu/project/id/101116856";

const objectives = [
  {
    number: "/01",
    title: "Artificial muscles",
    text: "Robust, high-power-density fluidic muscles that make low-cost dexterous robotic hands possible.",
  },
  {
    number: "/02",
    title: "Wearable coolers",
    text: "Cooling garments that reduce the energy spent on air conditioning and protect fragile people during extreme heat waves.",
  },
  {
    number: "/03",
    title: "Active textiles",
    text: "Textile artificial muscles that facilitate daily actions for the elderly and enable remote physical interactions.",
  },
];

export default async function RoboFluidPage() {
  const [papersResult, linesResult, peopleResult] = await Promise.all([
    getPapers(),
    getResearchLines(),
    getPeople(),
  ]);
  const papers = papersResult.data;
  const efm = sourceFor(papers, "electrofluidic-fiber-muscles");
  const team = projects.find((p) => p.slug === "robofluid")!.team;

  return (
    <main className="progetto">
      <section className="hero-paper">
        <div className="interno">
          <Link className="briciole" href="/research">
            ← Research
          </Link>
          <div>
            <span className="rivista-badge">
              ERC Starting Grant · 2024–2028
            </span>
          </div>
          <h1>RoboFluid</h1>
          <div className="autori">
            Robotic Fluids for artificial muscles, wearable cooling, and active
            textiles
            <br />
            Principal Investigator: Prof. Vito Cacucciolo · Politecnico di Bari
          </div>
        </div>
      </section>

      <div className="fatti">
        <div className="fatto">
          <div className="numero">€1.5 M</div>
          <div className="didascalia">EU contribution, ERC Starting Grant</div>
        </div>
        <div className="fatto">
          <div className="numero">5 years</div>
          <div className="didascalia">January 2024 – December 2028</div>
        </div>
        <div className="fatto">
          <div className="numero">Poliba</div>
          <div className="didascalia">
            host institution, Politecnico di Bari
          </div>
        </div>
      </div>

      <article className="paper-corpo">
        <h2>The idea</h2>
        <p>
          Fluid circulation is everywhere in living creatures and in machines,
          and it serves many functions at once: temperature regulation,
          transport of nutrients, mechanical actuation. A beating heart is a
          soft pump that keeps an animal alive.
        </p>
        <p>
          RoboFluid merges the capabilities of fluids with electrical control,
          to give robots and wearables the same advantages. Conventional
          fluidics needs many components — pumps, valves, tubing, plugs — and
          this has kept it out of untethered systems. RoboFluid replaces them
          with solid-state pumps in which the fluid is accelerated directly by
          electric fields (electrohydrodynamics, EHD), creating a new class of
          fluidic devices where flow is driven in situ by electrical signals,
          and where velocity, pressure and temperature of the fluid sense the
          state of the device and of its environment.
        </p>
        <p>
          On the scientific side, the project studies fluid mechanics and field
          emission in liquids under intense electric fields — the physics that
          sets how much pressure, flow and power these pumps can deliver.
        </p>
        <p>
          The project builds on two pumps developed at EPFL-LMTS: the
          stretchable pump, a soft pump with no moving parts, and the fiber
          pump, which generates pressure along its own length and can be woven
          into textiles. Woven into a garment, fiber pumps already circulate a
          fluid that heats or cools the wearer, with no external pump: the
          starting point for the wearable coolers of RoboFluid.
        </p>
        <FigurePair>
          <Video
            youtubeId="knOsNjW3Wu0"
            title="A miniature stretchable pump for the next generation of soft robots"
            caption="Stretchable pumps (When Vito was at EPFL-LMTS). Video: EPFL."
            source={sourceFor(papers, "stretchable-pumps-for-soft-machines")}
          />
          <Video
            youtubeId="forx6TA_1wg"
            title="Fiber-like pumps to power haptics devices and wearables"
            caption="Fiber pumps (When Vito was at EPFL-LMTS). Video: EPFL."
            source={sourceFor(papers, "fiber-pumps-wearable-fluidic-systems")}
          />
          <Video
            youtubeId="4_w8RxUY234"
            title="Fiber pumps: the self-pumping tubes for future fluidics"
            caption="Self-pumping tubes sewn into textiles (When Vito was at EPFL-LMTS). Video: LMTS, EPFL."
            source={sourceFor(papers, "fiber-pumps-wearable-fluidic-systems")}
          />
          <Video
            youtubeId="T3SxOuonEo8"
            title="Untethered thermoregulatory clothing using EHD fiber pumps"
            caption="Thermoregulatory clothing with fiber pumps (When Vito was at EPFL-LMTS). Video: LMTS, EPFL."
            source={sourceFor(papers, "fiber-pumps-wearable-fluidic-systems")}
          />
        </FigurePair>
        <p className="link-esterno">
          <a href={CORDIS} target="_blank" rel="noopener">
            Project objectives on CORDIS ↗
          </a>
        </p>
      </article>

      <Container>
        <h2 className="titolo-sezione">Objectives</h2>
        <div className="linee tre">
          {objectives.map((o) => (
            <article className="linea" key={o.number}>
              <div className="num">{o.number}</div>
              <h4>{o.title}</h4>
              <p>{o.text}</p>
            </article>
          ))}
        </div>

        <h2 className="titolo-sezione">Research lines</h2>
        <div className="linee">
          {linesResult.data.map((line) => (
            <article className="linea" key={line.id}>
              <div className="num">{line.number}</div>
              <h4>{line.title}</h4>
              <p>{line.description}</p>
            </article>
          ))}
        </div>
      </Container>

      <article className="paper-corpo">
        <h2>Results</h2>

        <Result
          id="efm"
          venue="Science Robotics · 2026"
          title="Electrofluidic fiber muscles"
          authors="O. Kilic Afsar, G. Pupillo, G. Vitucci, W. Babatain, H. Ishii, V. Cacucciolo — with the MIT Media Lab"
          actions={[
            {
              href: "/publications/electrofluidic-fiber-muscles",
              label: "Learn more",
            },
            {
              href: "https://zenodo.org/records/17902764",
              label: "Open-access paper",
              external: true,
            },
          ]}
        >
          <p>
            A new class of artificial muscles in fiber format. Each muscle
            integrates fiber EHD pumps and thin McKibben actuators in a closed
            fluidic circuit: electric, silent and untethered, with no external
            compressors or tubes. Thanks to bias pressure, the modular muscles
            reach a power density comparable to that of skeletal muscle, and
            woven in antagonistic pairs they move like biceps and triceps.
          </p>
          <Figure
            image={{
              url: "/papers/woven-muscle-pair.png",
              width: 1400,
              height: 356,
              alt: "Woven textile muscle pair",
            }}
            caption="Textile muscle pairs: McKibben actuators and fiber pumps braided into a single active fabric."
            source={efm}
          />
          <Video
            youtubeId="_tOTOjzNouU"
            title="Electrofluidic Fiber Muscles, Science Robotics, 2026"
            caption="The muscles in motion: contraction, extension and antagonistic pairs."
            source={efm}
          />
          <FigurePair>
            <Video
              youtubeId="_P6QoE8zGw0"
              title="An electric motor in the form of a fiber"
              caption="An electric motor in the form of a fiber. Video: MIT Media Lab."
              source={efm}
            />
            <Video
              youtubeId="HdjIukrfvcA"
              title="Untethered operation of electrofluidic woven muscles"
              caption="Untethered operation of woven muscles. Video: MIT Media Lab."
              source={efm}
            />
          </FigurePair>
        </Result>

        <Result
          id="efm-closed-loop"
          venue="IEEE Robotics and Automation Letters · 2026"
          title="Electrofluidic fiber muscles with closed-loop control"
          authors="A. Castellaneta, Y. Kuwajima, V. Cacucciolo"
          actions={[
            {
              href: "https://zenodo.org/records/23304121",
              label: "Open-access paper",
              external: true,
            },
            {
              href: "https://doi.org/10.1109/LRA.2026.3709124",
              label: "Paper on IEEE Xplore",
              external: true,
            },
          ]}
        >
          <p>
            For wearable and assistive robotics, power density is not enough:
            the muscle must also be controllable. A single electrofluidic fiber
            muscle, mounted like a biceps, drives a 70 g robotic forearm through
            an elbow range of 5° to 75°. A hybrid controller — a PID loop plus a
            quasi-static inverse model identified from experiments — sets the
            joint angle by modulating the voltage on the fiber pumps.
          </p>
          <Figure
            image={{
              url: "/projects/efm-closed-loop-arm.jpg",
              width: 1800,
              height: 996,
              alt: "Robotic arm actuated by an electrofluidic fiber muscle, with diagrams of the fiber pump and McKibben actuator",
            }}
            caption="A human-scale arm actuated by an electrofluidic fiber muscle: fiber EHD pumps pressurise a thin McKibben actuator, which contracts like a muscle."
            source={references.efmClosedLoop}
          />
          <p>
            In closed loop the arm reaches each target with an average rise time
            of 0.44 s, a settling time of 2.44 s and a mean steady-state error
            of 0.2°, and the hysteresis of the muscle drops by about 93%
            compared with open-loop operation.
          </p>
          <Figure
            image={{
              url: "/projects/efm-closed-loop-steps.jpg",
              width: 1800,
              height: 475,
              alt: "Sequence of the robotic arm reaching elbow angles from 5 to 55 degrees",
            }}
            caption="Position control in steps: the elbow reaches commanded angles from 5° to 55°."
            source={references.efmClosedLoop}
          />
        </Result>

        <h2>Team</h2>
        <Team members={team} people={peopleResult.data} />

        <h2 id="publications">Publications</h2>
        <PublicationList
          items={[
            {
              authors:
                "O. Kilic Afsar, G. Pupillo, G. Vitucci, W. Babatain, H. Ishii, V. Cacucciolo.",
              title: "Electrofluidic fiber muscles",
              venue: "Science Robotics 11 (2026)",
              links: [
                {
                  href: "/publications/electrofluidic-fiber-muscles",
                  label: "Learn more",
                  external: false,
                },
                {
                  href: "https://zenodo.org/records/17902764",
                  label: "Open access",
                },
                {
                  href: "https://doi.org/10.1126/scirobotics.ady6438",
                  label: "DOI",
                },
              ],
            },
            {
              authors: "A. Castellaneta, Y. Kuwajima, V. Cacucciolo.",
              title: "Electrofluidic fiber muscles with closed-loop control",
              venue:
                "IEEE Robotics and Automation Letters 11, 11007–11014 (2026)",
              links: [
                {
                  href: "https://zenodo.org/records/23304121",
                  label: "Open access",
                },
                {
                  href: "https://doi.org/10.1109/LRA.2026.3709124",
                  label: "DOI",
                },
              ],
            },
            {
              authors:
                "Marzuq, Kuwajima, Tan, Yamada, Nabae, Kakehi, Cacucciolo, Maeda.",
              title:
                "A compact, self-recovering wire electrode electrohydrodynamic pump for high-speed McKibben artificial muscle actuation",
              venue: "Advanced Intelligent Systems (2025)",
              links: [
                {
                  href: "https://doi.org/10.1002/aisy.202501035",
                  label: "DOI",
                },
              ],
            },
            {
              authors: "D. De Tommasi, F. Trentadue, G. Vitucci.",
              title:
                "A compact anisotropic model for the mechanical response of double network hydrogels",
              venue:
                "International Journal of Engineering Science 220, 104437 (2026)",
              links: [
                {
                  href: "https://doi.org/10.1016/j.ijengsci.2025.104437",
                  label: "DOI",
                },
              ],
            },
          ]}
        />

        <FundingBox
          title="Funding"
          logos={[
            {
              url: "/loghi/erc-eu.png",
              width: 1200,
              height: 517,
              altezza: 84,
              alt: "Funded by the European Union — European Research Council",
            },
          ]}
          rows={[
            {
              label: "Programme",
              value: "Horizon Europe — ERC Starting Grant (ERC-2023-STG)",
            },
            {
              label: "Project",
              value:
                "ROBOFLUID — Robotic Fluids for artificial muscles, wearable cooling, and active textiles",
            },
            {
              label: "Grant agreement",
              value: "101116856 · DOI 10.3030/101116856",
            },
            { label: "Duration", value: "1 January 2024 – 31 December 2028" },
            { label: "EU contribution", value: "€1,498,750" },
            { label: "Host institution", value: "Politecnico di Bari" },
            { label: "Principal Investigator", value: "Vito Cacucciolo" },
          ]}
          statement="Funded by the European Union (ERC, ROBOFLUID, 101116856). Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Research Council. Neither the European Union nor the granting authority can be held responsible for them."
          links={[{ href: CORDIS, label: "Project on CORDIS" }]}
        />
      </article>

      <OfflineNotice
        show={
          papersResult.offline || linesResult.offline || peopleResult.offline
        }
      />
    </main>
  );
}
