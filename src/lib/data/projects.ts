import type { Source } from "@/lib/sources";

/**
 * I progetti di ricerca del laboratorio, per /research e per la sitemap.
 *
 * Non stanno su Supabase come papers e news: ogni progetto ha una pagina
 * costruita a mano (src/app/research/<slug>/page.tsx), con sezioni diverse
 * da un progetto all'altro, e qui resta solo ciò che serve alla card.
 *
 * Fonti: CORDIS per date, importi e obiettivi dei progetti europei; gli
 * articoli (versioni ad accesso libero) per figure e risultati.
 */

/** Articoli citati dalle pagine dei progetti, con il link ad accesso libero. */
export const references = {
  efmClosedLoop: {
    label:
      "Castellaneta, Kuwajima, Cacucciolo. IEEE Robotics and Automation Letters 2026",
    url: "https://zenodo.org/records/23304121",
  },
  eaSuctionCups: {
    label: "Caruso, Shea, Cacucciolo. Advanced Materials 2025",
    url: "https://doi.org/10.1002/adma.202420231",
  },
  eaZipping: {
    label:
      "Mastrangelo, Caruso, Carbone, Cacucciolo. Extreme Mechanics Letters 2023",
    url: "https://doi.org/10.1016/j.eml.2023.101999",
  },
  eaPeeling: {
    label: "Cacucciolo, Shea, Carbone. Extreme Mechanics Letters 2022",
    url: "https://doi.org/10.1016/j.eml.2021.101529",
  },
} satisfies Record<string, Source>;

/**
 * Membro del gruppo di un progetto: lo slug di una persona in /people, o
 * nome e ruolo per chi non c'è.
 */
export type TeamMember =
  string | { name: string; role?: string; url?: string | null };

export type Project = {
  slug: string;
  title: string;
  /** Riga sopra il titolo nella card: tipo di finanziamento e periodo. */
  badge: string;
  summary: string;
  /** Righe in piccolo sotto il riassunto: finanziatori, partner. */
  meta: string;
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
    /** Slug del paper (per paperSource) o riferimento diretto. */
    paper?: string;
    source?: Source;
  };
  team: TeamMember[];
};

export const projects: Project[] = [
  {
    slug: "robofluid",
    title: "ERC RoboFluid",
    badge: "ERC Starting Grant · 2024–2028",
    summary:
      "Robotic fluids for artificial muscles, wearable cooling and active textiles. Solid-state pumps that move fluids with electric fields give robots and wearables the functions of a circulatory system: actuation, cooling and sensing.",
    meta: "European Research Council · Politecnico di Bari · Grant 101116856",
    image: {
      url: "/fiber-pump-two-hands.jpg",
      width: 2000,
      height: 1176,
      alt: "Two hands holding an electrofluidic fiber muscle coiled into loops",
      paper: "electrofluidic-fiber-muscles",
    },
    team: [
      "vito-cacucciolo",
      "yu-kuwajima",
      "andrea-castellaneta",
      "cesare-cariddi",
      "angelica-de-michele",
    ],
  },
  {
    slug: "electroactive-grippers",
    title: "Soft grippers with electroactive contacts",
    badge: "Research line · Spin-off OmniGrasp",
    summary:
      "Electroadhesion soft grippers: thin electroactive membranes that zip onto an object and hold it by electrostatic forces. Silent, fully electric and gentle on delicate objects — the technology behind the spin-off OmniGrasp.",
    meta: "EU Horizon Europe project HARTU (2023–2025) · with EPFL-LMTS",
    image: {
      url: "/projects/ea-suction-cup-pipe-card.jpg",
      width: 1760,
      height: 1100,
      alt: "An electroadhesion suction cup holding a pipe, with the words “Ceci n’est pas une suction cup”",
      source: references.eaSuctionCups,
    },
    team: [
      "vito-cacucciolo",
      "fabio-caruso",
      "simone-de-carolis",
      "fabio-gargano",
      "antonio-camposeo",
      "angelo-catalano",
    ],
  },
];
