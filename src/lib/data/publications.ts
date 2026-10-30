import { references } from "@/lib/data/projects";
import type { Source } from "@/lib/sources";

/**
 * Le altre pubblicazioni in /publications, oltre ai paper con una pagina
 * propria (papers in content.ts / Supabase). Non hanno un approfondimento:
 * "Learn more" porta al progetto a cui appartengono, sul risultato se la
 * pagina del progetto lo presenta.
 *
 * Dati da Crossref, sintesi dagli abstract (via OpenAlex). Anteprime dalle
 * figure degli articoli (CC BY) o, dove la licenza non lo permette, da un
 * fotogramma dei video del laboratorio.
 */
export type Publication = {
  id: string;
  title: string;
  journal: string;
  year: number;
  /** Nota accanto a rivista e anno, come badge_note dei paper. */
  badge_note: string | null;
  authors_full: string;
  citation: string;
  abstract: string;
  external_url: string;
  /** Pagina del progetto, con l'ancora del risultato se c'è. */
  learn_more: string;
  preview: { url: string; label: string } | null;
  source: Source | null;
};

export const publications: Publication[] = [
  {
    id: "efm-closed-loop-control",
    title: "Electrofluidic fiber muscles with closed-loop control",
    journal: "IEEE Robotics and Automation Letters",
    year: 2026,
    badge_note: null,
    authors_full: "A. Castellaneta, Y. Kuwajima, V. Cacucciolo",
    citation: "IEEE Robotics and Automation Letters 11, 11007–11014 (2026)",
    abstract:
      "A single electrofluidic fiber muscle drives a robotic forearm under closed-loop position control, with a 0.2° steady-state error and about 93% less hysteresis than in open loop.",
    external_url: "https://doi.org/10.1109/LRA.2026.3709124",
    learn_more: "/research/robofluid#efm-closed-loop",
    preview: {
      url: "/projects/preview-efm-closed-loop.jpg",
      label: "Preview — robotic arm actuated by an electrofluidic fiber muscle",
    },
    source: references.efmClosedLoop,
  },
  {
    id: "electroadhesion-suction-cups",
    title: "Electroadhesion suction cups",
    journal: "Advanced Materials",
    year: 2025,
    badge_note: "with EPFL-LMTS",
    authors_full: "F. Caruso, H. Shea, V. Cacucciolo",
    citation: "Advanced Materials 37, 2420231 (2025)",
    abstract:
      "Soft, silent, fully electric suction cups that zip onto objects by electroadhesion and form a passive vacuum: 1.5 W to hold payloads up to 1.5 kg, flat or curved, smooth or rough.",
    external_url: "https://doi.org/10.1002/adma.202420231",
    learn_more: "/research/electroactive-grippers#electroadhesion-suction-cups",
    preview: {
      url: "/projects/ea-suction-cup-pipe.jpg",
      label: "Preview — an electroadhesion suction cup holding a pipe",
    },
    source: references.eaSuctionCups,
  },
  {
    id: "electroadhesion-zipping",
    title: "Electroadhesion zipping with soft grippers on curved objects",
    journal: "Extreme Mechanics Letters",
    year: 2023,
    badge_note: null,
    authors_full: "M. Mastrangelo, F. Caruso, G. Carbone, V. Cacucciolo",
    citation: "Extreme Mechanics Letters 61, 101999 (2023)",
    abstract:
      "With the right materials and geometry, electroadhesion alone drives a soft finger to zip around an object, combining macroscopic wrapping with conformal contact at the scale of roughness.",
    external_url: "https://doi.org/10.1016/j.eml.2023.101999",
    learn_more: "/research/electroactive-grippers#electroadhesion-zipping",
    preview: {
      url: "/projects/preview-ea-zipping.jpg",
      label: "Preview — electroadhesive fingers zipped around a grapefruit",
    },
    source: references.eaZipping,
  },
  {
    id: "peeling-electroadhesion",
    title: "Peeling in electroadhesion soft grippers",
    journal: "Extreme Mechanics Letters",
    year: 2022,
    badge_note: "with EPFL-LMTS",
    authors_full: "V. Cacucciolo, H. Shea, G. Carbone",
    citation: "Extreme Mechanics Letters 50, 101529 (2022)",
    abstract:
      "Peeling explains why electroadhesion forces change by over 1000 times with the tape angle, and puts it to use: a gripper that grasps at 0° and releases in under 300 ms at more than 30°.",
    external_url: "https://doi.org/10.1016/j.eml.2021.101529",
    learn_more: "/research/electroactive-grippers#peeling",
    // La figura dell'articolo è CC BY-NC-ND e non si ritaglia: l'anteprima
    // è un fotogramma del video del laboratorio su questo lavoro.
    preview: {
      url: "/projects/preview-ea-peeling.jpg",
      label:
        "Preview — soft gripper with electroadhesive fingers holding a lime",
    },
    source: references.eaPeeling,
  },
  {
    id: "high-force-electroadhesion-curved",
    title: "High-force soft grippers with electroadhesion on curved objects",
    journal: "IEEE RoboSoft",
    year: 2022,
    badge_note: null,
    authors_full: "M. Mastrangelo, V. Cacucciolo",
    citation:
      "IEEE 5th International Conference on Soft Robotics (RoboSoft), 384–389 (2022)",
    abstract:
      "The first model of electroadhesive tapes on curved objects: the tension in the curved tape pushes it against the object, which explains holding forces above 15 N with a 1 g gripper.",
    external_url: "https://doi.org/10.1109/RoboSoft54090.2022.9762116",
    learn_more: "/research/electroactive-grippers#publications",
    // Articolo IEEE senza versione aperta: fotogramma di un video OmniGrasp
    // dello stesso gripper, con il video come fonte.
    preview: {
      url: "/projects/preview-ea-curved.jpg",
      label: "Preview — electroadhesive fingers holding a banana",
    },
    source: {
      label: "Video: OmniGrasp",
      url: "https://www.youtube.com/watch?v=Wr10sxSV8J8",
    },
  },
];
