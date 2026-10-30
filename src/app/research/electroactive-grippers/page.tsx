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
import { Button, OfflineNotice } from "@/components/ui";
import { projects, references } from "@/lib/data/projects";
import { getPeople } from "@/lib/queries";
import { site } from "@/lib/site";

/**
 * Linea di ricerca sui gripper a elettroadesione, alla base dello spin-off
 * OmniGrasp. Risultati e figure dagli articoli ad accesso libero (CC BY,
 * tranne Extreme Mech. Lett. 2022, CC BY-NC-ND: la sua figura è riportata
 * intera e senza modifiche); le figure di Advanced Materials 2025 sono gli
 * originali forniti da Vito. Dati di HARTU ed EASIERGrasp da CORDIS. Video
 * dai canali YouTube di Vito Cacucciolo e del progetto HARTU.
 */

const description =
  "Electroadhesion soft grippers and suction cups: thin electroactive membranes that hold objects by electrostatic forces. The research behind the spin-off OmniGrasp.";

export const metadata: Metadata = {
  title: "Soft grippers with electroactive contacts",
  description,
  alternates: { canonical: "/research/electroactive-grippers" },
  openGraph: {
    title: "Soft grippers with electroactive contacts — RoboPhysics Laboratory",
    description,
  },
};

const HARTU_CORDIS = "https://cordis.europa.eu/project/id/101092100";

export default async function ElectroactiveGrippersPage() {
  const { data: people, offline } = await getPeople();
  const team = projects.find((p) => p.slug === "electroactive-grippers")!.team;

  return (
    <main className="progetto">
      <section className="hero-paper">
        <div className="interno">
          <Link className="briciole" href="/research">
            ← Research
          </Link>
          <div>
            <span className="rivista-badge">
              Research line · Spin-off OmniGrasp
            </span>
          </div>
          <h1>Soft grippers with electroactive contacts</h1>
          <div className="autori">
            Electroadhesion soft grippers and suction cups
            <br />
            In collaboration with the Soft Transducers Laboratory (LMTS), EPFL
          </div>
        </div>
      </section>

      <div className="fatti">
        <div className="fatto">
          <div className="numero">1.5 kg</div>
          <div className="didascalia">
            payload of an electroadhesion suction cup
          </div>
        </div>
        <div className="fatto">
          <div className="numero">1.5 W</div>
          <div className="didascalia">
            power to hold it, with no compressed air
          </div>
        </div>
        <div className="fatto">
          <div className="numero">&lt;300 ms</div>
          <div className="didascalia">
            to release, by changing the peeling angle
          </div>
        </div>
      </div>

      <article className="paper-corpo">
        <h2>The principle</h2>
        <p>
          Electroadhesion grippers hold objects with electrostatic forces. A
          thin, soft membrane carries interdigitated electrodes: when a voltage
          is applied, the electric field reaches into the object and pulls the
          membrane onto its surface. Because the membrane is soft, it conforms
          to the object at the scale of its roughness, and the adhesion is
          switched on and off by an electrical signal.
        </p>
        <p>
          The result is a gripper that grasps without squeezing — from cherry
          tomatoes to jars — silently, with low power and no vacuum
          infrastructure. Making it practical required understanding the contact
          mechanics behind it: how adhesion depends on the peeling angle, how
          fingers zip onto curved objects, and how a membrane can combine
          electroadhesion with suction.
        </p>
        <Figure
          image={{
            url: "/projects/ea-suction-cup-pipe.jpg",
            width: 1400,
            height: 1933,
            alt: "An electroadhesion suction cup holding a pipe by its bowl, with the words “Ceci n’est pas une suction cup”",
          }}
          caption="Ceci n’est pas une suction cup: an electroadhesion suction cup holding a pipe, after Magritte."
          source={references.eaSuctionCups}
        />

        <h2>Results</h2>

        <Result
          id="electroadhesion-suction-cups"
          venue="Advanced Materials · 2025 · with EPFL-LMTS"
          title="Electroadhesion suction cups"
          authors="F. Caruso, H. Shea, V. Cacucciolo"
          actions={[
            {
              href: "https://doi.org/10.1002/adma.202420231",
              label: "Open-access paper",
              external: true,
            },
          ]}
        >
          <p>
            Suction cups are the light bulbs of robotics: simple and reliable,
            but energy-hungry and dependent on a bulky, noisy vacuum
            infrastructure. Electroadhesion suction cups are soft, silent,
            monolithic and fully electric. The membrane zips onto the object,
            and as it stretches during lifting it forms a passive vacuum inside
            its conical chamber. With a power consumption of only 1.5 W they
            grasp flat and curved objects, smooth or rough, holding payloads up
            to 1.5 kg.
          </p>
          <Figure
            image={{
              url: "/projects/ea-suction-cup-membrane.jpg",
              width: 1800,
              height: 1552,
              alt: "Electroadhesion suction cup lifting a grapefruit, its electroadhesive membrane, and the approach, zipping and lifting phases",
            }}
            caption="The suction cup and its membrane, 43 mm across: silver-ink electrodes embedded in stretchable silicone. With the voltage on the membrane zips onto the surface, and lifting it creates a passive vacuum."
            source={references.eaSuctionCups}
          />
          <Video
            youtubeId="61yuRkj5I6Y"
            title="Electroadhesion suction cups"
            caption="Electroadhesion suction cups in action."
            source={references.eaSuctionCups}
          />
          <p>
            Turning the voltage off and opening a small valve lets air back into
            the chamber: the object is released in a fraction of a second.
            Mounted on a robot arm, the suction cups pick fruit, soft pouches,
            jars and packaged food.
          </p>
          <Figure
            image={{
              url: "/projects/ea-suction-cup-release.jpg",
              width: 1800,
              height: 1160,
              alt: "Diagrams and photos of the approach, pick, lift and release of a grapefruit",
            }}
            caption="Approach, pick, hold and release of a grapefruit: picking in less than 0.3 s, release in less than 0.1 s."
            source={references.eaSuctionCups}
          />
          <Figure
            image={{
              url: "/projects/ea-suction-cup-sorting.jpg",
              width: 1800,
              height: 1474,
              alt: "A robot arm with an electroadhesion suction cup moving groceries from one box to another",
            }}
            caption="Mounted on a robot arm, the suction cup moves a can, a bag of biscuits, a pouch, a yogurt pack, a jar and a tray of beans from one box to another."
            source={references.eaSuctionCups}
          />
        </Result>

        <Result
          id="electroadhesion-zipping"
          venue="Extreme Mechanics Letters · 2023"
          title="Electroadhesion zipping with soft grippers on curved objects"
          authors="M. Mastrangelo, F. Caruso, G. Carbone, V. Cacucciolo"
          actions={[
            {
              href: "https://doi.org/10.1016/j.eml.2023.101999",
              label: "Open-access paper",
              external: true,
            },
          ]}
        >
          <p>
            Adding actuators to close soft fingers stiffens them, and stiffer
            fingers conform less and adhere less. With the right materials and
            geometry, electroadhesion alone can drive a soft finger to zip
            around an object. The phenomenon is governed by two voltage
            thresholds — one below which nothing happens, one above which the
            finger fully collapses on the object — and, unlike electroadhesion
            forces, scales with V²/d rather than V²/d². Thin fingers wrap
            objects of different materials with angles up to 90°, pointing to
            grippers that lift objects more than 1000 times their own weight.
          </p>
          <Figure
            image={{
              url: "/projects/ea-zipping.jpg",
              width: 1295,
              height: 1500,
              alt: "Electroadhesive tape zipping onto a curved substrate at increasing voltage, wrapping angle versus voltage, and fingers zipping around a grapefruit",
            }}
            caption="From no zip to full zip as the voltage rises: model and experiments, and fingers zipping around a grapefruit."
            source={references.eaZipping}
          />
        </Result>

        <Result
          id="peeling"
          venue="Extreme Mechanics Letters · 2022 · with EPFL-LMTS"
          title="Peeling in electroadhesion soft grippers"
          authors="V. Cacucciolo, H. Shea, G. Carbone"
          actions={[
            {
              href: "https://doi.org/10.1016/j.eml.2021.101529",
              label: "Open-access paper",
              external: true,
            },
          ]}
        >
          <p>
            Two problems held electroadhesion back: the adhesion force can vary
            more than 1000 times with the angle between tape and object, and
            release is slow because of residual adhesion. Simple peeling models
            predict a force from under 1 mN to over 1 N as the angle goes from
            90° to 0°. A gripper with motorized fingers puts this to use: it
            grasps at 0°, picking up anything from a 10 g cherry tomato to a 600
            g mango, and releases at more than 30°, reliably and in under 300
            ms.
          </p>
          <Figure
            image={{
              url: "/projects/ea-peeling.jpg",
              width: 1500,
              height: 1324,
              alt: "Electroadhesion tape peeling model, force versus angle, and a gripper grasping and releasing a tomato",
            }}
            caption="Peeling force versus angle, and the gripper approaching, grasping and releasing a tomato."
            source={references.eaPeeling}
          />
          <Video
            youtubeId="OsWaUnG030E"
            title="Electroadhesion soft gripper grasping delicate fruit"
            caption="The gripper grasping delicate fruit without damaging it."
            source={references.eaPeeling}
          />
        </Result>

        <h2>Project HARTU (2023–2025)</h2>
        <p>
          HARTU — Handling with AI-enhanced Robotic Technologies for flexible
          manufacturing — was an industry-driven Horizon Europe project on the
          three stages of handling parts: grasping, assembly and release. One of
          its four technical goals was to develop versatile and dexterous soft
          grippers with electroactive fingertips, the contribution of
          Politecnico di Bari and OmniGrasp. The technologies were deployed in
          five industrial scenarios: four manufacturing lines — automotive,
          household appliances, hand tools and food processing — and one in
          logistics. Electroadhesion suction cups and electroadhesion zipping
          are among the project&apos;s published results.
        </p>
        <FigurePair>
          <Video
            youtubeId="1cJm7az7Xio"
            title="Welcome to the HARTU project"
            caption="HARTU: objectives, expected results and use cases. Video: HARTU project."
          />
          <Video
            youtubeId="Xf1MvUybh04"
            title="How to pick (almost) anything: soft grippers revolution"
            caption="How to pick (almost) anything: the first HARTU webinar, on soft grippers, hosted by OmniGrasp and Politecnico di Bari. Video: HARTU project."
          />
        </FigurePair>

        <FundingBox
          title="HARTU — concluded"
          logos={[
            {
              url: "/loghi/hartu.png",
              width: 600,
              height: 303,
              altezza: 52,
              alt: "HARTU",
            },
            {
              url: "/loghi/funded-by-eu.png",
              width: 1200,
              height: 267,
              altezza: 44,
              alt: "Funded by the European Union",
            },
          ]}
          rows={[
            {
              label: "Programme",
              value:
                "Horizon Europe — Digital, Industry and Space (HORIZON-CL4-2022-TWIN-TRANSITION-01)",
            },
            {
              label: "Grant agreement",
              value: "101092100 · DOI 10.3030/101092100",
            },
            { label: "Duration", value: "1 January 2023 – 31 December 2025" },
            {
              label: "Consortium",
              value:
                "12 beneficiaries and 2 associated partners from 6 countries, coordinated by Fundación Tekniker (Spain)",
            },
            {
              label: "Lab partners",
              value:
                "Politecnico di Bari (€428,750) · OmniGrasp Srl (€429,375)",
            },
            { label: "Total EU contribution", value: "€5,926,987.50" },
          ]}
          statement="Funded by the European Union (HARTU, 101092100). Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union. Neither the European Union nor the granting authority can be held responsible for them."
          links={[
            { href: HARTU_CORDIS, label: "Project on CORDIS" },
            { href: "https://www.hartu-project.eu/", label: "Project website" },
          ]}
        />

        <h2>Spin-off: OmniGrasp</h2>
        <p>
          OmniGrasp, the laboratory&apos;s spin-off, creates electroactive soft
          robots to solve automation with difficult objects: food, textiles and
          biomedical products. Building on the results of HARTU, where the
          electroadhesion technology was demonstrated at TRL 4, OmniGrasp is now
          taking electroadhesion suction cups to industrial pilots in packaging,
          automotive assembly and logistics with the EIC Transition project{" "}
          <a
            href="https://cordis.europa.eu/project/id/101291667"
            target="_blank"
            rel="noopener"
          >
            EASIERGrasp
          </a>{" "}
          (2026–2029).
        </p>
        <FigurePair>
          <Video
            youtubeId="9JarUQPD7UQ"
            title="Robot soft gripper Omnigrasp pick-and-place orange, apple and saline pouch"
            caption="Pick and place of an orange, an apple and a saline pouch. Video: OmniGrasp."
          />
          <Video
            youtubeId="Wr10sxSV8J8"
            title="Omnigrasp soft gripper"
            caption="From a mushroom to an artichoke: soft fingers that conform to the object. Video: OmniGrasp."
          />
          <Video
            youtubeId="_wBSH1sBVME"
            title="Electroadhesive Robotics gripper grasping a multitude of objects using soft fingers"
            caption="Food, plastic, metal: objects of different sizes, shapes and materials. Video: OmniGrasp."
          />
          <Video
            youtubeId="-OcvHenMq4Y"
            title="Packing shopping cart with Omnigrasp Soft Gripper"
            caption="Packing a shopping cart. Video: OmniGrasp."
          />
        </FigurePair>
        <div className="azioni-risultato">
          <Button href={site.spinoff.url} external>
            Visit OmniGrasp
          </Button>
        </div>

        <h2>Team</h2>
        <Team members={team} people={people} />

        <h2 id="publications">Publications</h2>
        <PublicationList
          items={[
            {
              authors: "F. Caruso, H. Shea, V. Cacucciolo.",
              title: "Electroadhesion suction cups",
              venue: "Advanced Materials 37, 2420231 (2025)",
              links: [
                {
                  href: "https://doi.org/10.1002/adma.202420231",
                  label: "Open access",
                },
              ],
            },
            {
              authors: "M. Mastrangelo, F. Caruso, G. Carbone, V. Cacucciolo.",
              title:
                "Electroadhesion zipping with soft grippers on curved objects",
              venue: "Extreme Mechanics Letters 61, 101999 (2023)",
              links: [
                {
                  href: "https://doi.org/10.1016/j.eml.2023.101999",
                  label: "Open access",
                },
              ],
            },
            {
              authors: "M. Mastrangelo, V. Cacucciolo.",
              title:
                "High-force soft grippers with electroadhesion on curved objects",
              venue:
                "IEEE 5th International Conference on Soft Robotics (RoboSoft) (2022)",
              links: [
                {
                  href: "https://doi.org/10.1109/RoboSoft54090.2022.9762116",
                  label: "DOI",
                },
              ],
            },
            {
              authors: "V. Cacucciolo, H. Shea, G. Carbone.",
              title: "Peeling in electroadhesion soft grippers",
              venue: "Extreme Mechanics Letters 50, 101529 (2022)",
              links: [
                {
                  href: "https://doi.org/10.1016/j.eml.2021.101529",
                  label: "Open access",
                },
              ],
            },
          ]}
        />
      </article>

      <OfflineNotice show={offline} />
    </main>
  );
}
