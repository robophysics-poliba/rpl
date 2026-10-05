import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import {
  DocumentIcon,
  GoogleScholarIcon,
  LinkedInIcon,
} from "@/components/social-icons";
import { Button } from "@/components/ui";
import { asset, site } from "@/lib/site";

/**
 * Pagina profilo del PI. È l'unica scheda di /people con una pagina propria,
 * quindi i contenuti stanno qui invece che in content.ts: vengono da
 * vitocacu.me, il suo sito personale, e dal suo CV (public/cv/).
 */

const description =
  "Vito Cacucciolo, Associate Professor at Politecnico di Bari and Principal Investigator of the RoboPhysics Laboratory. ERC Starting Grant holder.";

export const metadata: Metadata = {
  title: "Vito Cacucciolo",
  description,
  alternates: { canonical: "/people/vito-cacucciolo" },
  openGraph: {
    title: "Vito Cacucciolo — RoboPhysics Laboratory",
    description,
    type: "profile",
  },
};

/**
 * Loghi delle istituzioni, presi dai rispettivi siti, in public/loghi/; quello
 * del Politecnico è lo stesso dell'header. Politecnico e OmniGrasp sono
 * bianchi, pensati per fondi blu: `scuro` li porta al nero sul fondo chiaro.
 * `altezza` è decisa logo per logo: a parità di altezza un marchio pieno come
 * EPFL pesa molto più di uno con testo sottile.
 */
const logos = {
  poliba: {
    src: "/logo-politecnico.svg",
    alt: site.institution,
    width: 827,
    height: 318,
    scuro: true,
    altezza: 36,
  },
  omnigrasp: {
    src: "/loghi/omnigrasp.webp",
    alt: "OmniGrasp",
    width: 768,
    height: 145,
    scuro: true,
    altezza: 18,
  },
  erc: {
    src: "/loghi/erc-small.png",
    alt: "European Research Council",
    width: 220,
    height: 221,
    altezza: 36,
  },
  mit: {
    src: "/loghi/mit-media-lab.svg",
    alt: "MIT Media Lab",
    width: 138,
    height: 82,
    altezza: 38,
  },
  eu: {
    src: "/loghi/eu.svg",
    alt: "European Union",
    width: 900,
    height: 600,
    altezza: 26,
  },
  bridge: {
    src: "/loghi/bridge.svg",
    alt: "BRIDGE",
    width: 142,
    height: 31,
    altezza: 19,
  },
  epfl: {
    src: "/loghi/epfl.svg",
    alt: "EPFL",
    width: 182,
    height: 53,
    altezza: 23,
  },
  santanna: {
    src: "/loghi/sant-anna.svg",
    alt: "Scuola Superiore Sant’Anna",
    width: 246,
    height: 67,
    altezza: 31,
  },
};

const positions: Entry[] = [
  {
    when: "Since 2023",
    what: "Associate Professor",
    where: `${site.institution} — ${site.department}`,
    logo: logos.poliba,
  },
  {
    when: "Since 2022",
    what: "Founder and President",
    where: "OmniGrasp Srl",
    href: site.spinoff.url,
    logo: logos.omnigrasp,
  },
];

const experience: Entry[] = [
  {
    when: "2023",
    what: "ERC Starting Grant",
    where: [
      {
        text: "European Research Council",
        href: "https://erc.europa.eu/apply-grant/starting-grant",
      },
      {
        text: "RoboFluid",
        href: "https://erc.europa.eu/sites/default/files/2023-09/erc-2023-stg-results-all-domains.pdf",
      },
    ],
    logo: [logos.erc, logos.eu],
  },
  {
    when: "2022 – 2026",
    what: "Research Affiliate",
    where: "MIT Media Lab, USA",
    href: "https://www.media.mit.edu/",
    logo: logos.mit,
  },
  {
    when: "2020 – 2021",
    what: "BRIDGE Fellow",
    where: "SNSF – Innosuisse",
    href: "https://www.bridge.ch/en/proof-of-concept/supported-projects-2020",
    logo: logos.bridge,
  },
  {
    when: "2017 – 2021",
    what: "Scientist",
    where: "EPFL Soft Transducers Laboratory (LMTS), Prof. H. Shea",
    href: "https://www.epfl.ch/labs/lmts/",
    logo: logos.epfl,
  },
  {
    when: "2017",
    what: "PhD in BioRobotics",
    where: "Scuola Superiore Sant’Anna, Pisa — Prof. C. Laschi",
    href: "https://www.santannapisa.it/en",
    logo: logos.santanna,
  },
];

const teaching: Entry[] = [
  {
    when: "Since 2023",
    what: "Mechatronics",
    where:
      "Master degree in Mechanical Engineering — second year, first semester",
    logo: logos.poliba,
  },
  {
    when: "Since 2024",
    what: "Applied Mechanics, second module",
    where:
      "Master degree in Automation and Robotic Engineering — first year, second semester",
    logo: logos.poliba,
  },
];

/** I primi tre hanno una pagina sul sito, gli altri rimandano all'editore. */
const highlights = [
  {
    venue: "Science Robotics · 2026",
    title: "Electrofluidic Fiber Muscles",
    text: "Electrically driven artificial muscles with a power density comparable to skeletal muscle (50 W/kg), driven by EHD fiber pumps in a closed circuit. 20% strain, response under 0.3 s.",
    href: "/research/electrofluidic-fiber-muscles",
  },
  {
    venue: "Science · 2023",
    title: "Fiber pumps for wearable fluidics",
    text: "The first pumps in the form of 2 mm-thick rubber tubes: the tube is the pump, enabling fluidics for thermally active clothing and soft robots.",
    href: "/research/fiber-pumps-wearable-fluidic-systems",
  },
  {
    venue: "Nature · 2019",
    title: "Stretchable pumps for soft machines",
    text: "World-first fully stretchable pumps, enabling thermally active wearables and fluidic artificial muscles.",
    href: "/research/stretchable-pumps-for-soft-machines",
  },
  {
    venue: "Extreme Mechanics Letters · 2022",
    title: "Peeling in electroadhesion soft grippers",
    text: "Strong and fast grippers for delicate objects, enabled by understanding the peeling mechanics of electroadhesion.",
    href: "https://www.sciencedirect.com/science/article/pii/S2352431621002066",
    external: true,
  },
  {
    venue: "Advanced Materials · 2018",
    title: "Soft Robotic Grippers",
    text: "A review of the fast-growing field of soft robotic grippers.",
    href: "https://onlinelibrary.wiley.com/doi/full/10.1002/adma.201707035",
    external: true,
  },
];

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  altezza: number;
  scuro?: boolean;
};

/** Un tratto della riga "dove", con il suo link se ne ha uno. */
type Part = { text: string; href?: string };

type Entry = {
  when: string;
  what: string;
  /** Una stringa con un solo link (`href`), o più tratti con link separati. */
  where: string | Part[];
  href?: string;
  logo?: Logo | Logo[];
};

function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ul className="profilo-tappe">
      {entries.map((entry) => (
        <li key={`${entry.when}-${entry.what}`}>
          <div className="quando">{entry.when}</div>
          <div>
            <div className="cosa">{entry.what}</div>
            <div className="dove">
              {(typeof entry.where === "string"
                ? [{ text: entry.where, href: entry.href }]
                : entry.where
              ).map((part, i) => (
                <Fragment key={part.text}>
                  {i > 0 && " — "}
                  {part.href ? (
                    <a href={part.href} target="_blank" rel="noopener">
                      {part.text}
                    </a>
                  ) : (
                    part.text
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="logo">
            {[entry.logo ?? []].flat().map((logo) => (
              <Image
                key={logo.src}
                className={logo.scuro ? "scuro" : undefined}
                src={asset(logo.src)}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                style={{ height: logo.altezza }}
                unoptimized
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function VitoCacuccioloPage() {
  return (
    <main className="profilo">
      <section className="hero-paper">
        <div className="interno">
          <Link className="briciole" href="/people">
            ← People
          </Link>
          <div>
            <span className="rivista-badge">Principal Investigator</span>
          </div>
          <h1>Vito Cacucciolo</h1>
          <div className="autori">
            Associate Professor · {site.institution}, DMMM
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </section>

      <section className="wearable profilo-intro">
        <div className="foto">
          <Image
            src={asset("/people/vito-cacucciolo-profile.jpg")}
            alt="Portrait of Vito Cacucciolo"
            width={999}
            height={1333}
            sizes="240px"
            priority
          />
        </div>
        <div className="testo">
          <p className="claim">
            “Robots have the potential to free humans from strenuous labour,
            replace them in dangerous tasks and augment human abilities. My
            long-term goal is to understand physical intelligence and use it to
            create adaptive materials, human-centred robots and smart
            wearables.”
          </p>
          <ul className="profilo-link">
            <li>
              <a
                href="https://www.linkedin.com/in/vito-cacucciolo/"
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://scholar.google.com/citations?user=GGRcO6wAAAAJ&hl=en"
                target="_blank"
                rel="noopener"
              >
                <GoogleScholarIcon />
                Google Scholar
              </a>
            </li>
            <li>
              <a
                href={asset("/cv/vito-cacucciolo-cv.pdf")}
                target="_blank"
                rel="noopener"
              >
                <DocumentIcon />
                CV (PDF)
              </a>
            </li>
          </ul>
        </div>
      </section>

      <article className="paper-corpo">
        <h2>Current positions</h2>
        <Timeline entries={positions} />

        <h2>Experience</h2>
        <Timeline entries={experience} />

        <h2>Teaching</h2>
        <Timeline entries={teaching} />

        <h2>Research highlights</h2>
        <div className="profilo-lavori">
          {highlights.map((item) =>
            item.external ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener"
              >
                <Highlight {...item} />
              </a>
            ) : (
              <Link key={item.title} href={item.href}>
                <Highlight {...item} />
              </Link>
            ),
          )}
        </div>

        <h2>Spin-offs / Technology Transfer</h2>
        <p>
          Vito is founder and president of OmniGrasp, the laboratory’s spin-off,
          which creates electroactive soft robots to solve automation with
          difficult objects: food, textiles and biomedical products.
        </p>

        <div className="paper-azioni">
          <Button href={site.spinoff.url} external>
            Visit OmniGrasp
          </Button>
        </div>
      </article>
    </main>
  );
}

function Highlight({
  venue,
  title,
  text,
  external,
}: {
  venue: string;
  title: string;
  text: string;
  external?: boolean;
}) {
  return (
    <>
      <div className="dove-pub">{venue}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="leggi">
        {external ? "Read the paper ↗" : "Read more →"}
      </span>
    </>
  );
}
