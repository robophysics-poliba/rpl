import type { Paper } from "@/lib/types";

/** Riferimento a un articolo scientifico, per le didascalie delle immagini. */
export type Source = { label: string; url: string | null };

/**
 * "Smith, Cacucciolo, Shea. Science 2023", con il link alla versione ad
 * accesso libero se c'è, altrimenti alla pagina dell'editore.
 */
export function paperSource(paper: Paper): Source {
  const authors = paper.authors_short.replace(/\.\s*$/, "");
  return {
    label: `${authors}. ${paper.journal} ${paper.year}`,
    url: paper.open_access_url ?? paper.external_url,
  };
}

/** Il riferimento del paper con quello slug, se il paper esiste. */
export function sourceFor(papers: Paper[], slug: string | null | undefined) {
  const paper = slug ? papers.find((p) => p.slug === slug) : undefined;
  return paper ? paperSource(paper) : null;
}
