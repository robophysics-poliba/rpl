import type { Metadata } from "next";
import Link from "next/link";

import { Media } from "@/components/media";
import { SourceCredit } from "@/components/source-credit";
import { Container, InnerHero, OfflineNotice } from "@/components/ui";
import { publications } from "@/lib/data/publications";
import { getPapers } from "@/lib/queries";
import { paperSource, type Source } from "@/lib/sources";

export const revalidate = 300;

const intro =
  "Selected publications from the RoboPhysics Laboratory and its principal investigator. Each entry links to the original paper on the publisher's site.";

export const metadata: Metadata = {
  title: "Publications",
  description: intro,
  alternates: { canonical: "/publications" },
};

/** Una voce dell'elenco: un paper con pagina propria o una pubblicazione. */
type Entry = {
  key: string;
  title: string;
  journal: string;
  year: number;
  badge_note: string | null;
  authors_full: string;
  citation: string;
  abstract: string;
  external_url: string | null;
  learn_more: string;
  preview: { url: string; label: string } | null;
  source: Source | null;
  /** Ha una pagina in /publications/[slug]. */
  featured: boolean;
};

export default async function PublicationsPage() {
  const { data: papers, offline } = await getPapers();

  // Dalla più recente; nello stesso anno prima i paper con pagina propria
  // (Science Robotics 2026 apre l'elenco), poi le altre nell'ordine di
  // publications.ts (RA-L 2026 subito dopo).
  const entries: Entry[] = [
    ...papers.map((paper) => {
      const url = paper.preview_url ?? paper.media_url;
      return {
        key: paper.id,
        title: paper.title,
        journal: paper.journal,
        year: paper.year,
        badge_note: paper.badge_note,
        authors_full: paper.authors_full,
        citation: paper.citation,
        abstract: paper.abstract,
        external_url: paper.external_url,
        learn_more: `/publications/${paper.slug}`,
        preview: url
          ? {
              url,
              label: paper.media_label.replace(/^Image —/, "Preview —"),
            }
          : null,
        source: paperSource(paper),
        featured: true,
      };
    }),
    ...publications.map((pub) => ({
      ...pub,
      key: pub.id,
      featured: false,
    })),
  ].sort((a, b) => b.year - a.year || Number(b.featured) - Number(a.featured));

  return (
    <main>
      <InnerHero eyebrow="Publications" title="Peer-reviewed research">
        {intro}
      </InnerHero>

      <Container>
        <div className="pub-list">
          {entries.map((entry) => (
            <article
              className={
                entry.preview ? "pub-item" : "pub-item senza-anteprima"
              }
              key={entry.key}
            >
              {entry.preview && (
                <div className="anteprima">
                  <Media
                    url={entry.preview.url}
                    label={entry.preview.label}
                    fill
                    sizes="(max-width: 960px) 100vw, 230px"
                  />
                  <SourceCredit source={entry.source} overlay />
                </div>
              )}
              <div className="dettagli">
                <span className="rivista">
                  {entry.journal} · {entry.year}
                  {entry.badge_note && ` (${entry.badge_note})`}
                </span>
                <h3>{entry.title}</h3>
                <div className="autori-pub">
                  {entry.authors_full} · {entry.citation}
                </div>
                <p>{entry.abstract}</p>
                <div className="azioni-pub">
                  {entry.external_url && (
                    <a
                      className="link-pub"
                      href={entry.external_url}
                      target="_blank"
                      rel="noopener"
                    >
                      Read publication →
                    </a>
                  )}
                  <Link className="link-pub soft" href={entry.learn_more}>
                    Learn more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <OfflineNotice show={offline} />
    </main>
  );
}
