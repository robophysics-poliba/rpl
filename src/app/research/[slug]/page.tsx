import type { Metadata } from "next";
import Link from "next/link";

import { getPapers } from "@/lib/queries";
import { basePath } from "@/lib/site";

/**
 * Indirizzi vecchi. Le pagine dei paper stavano in /research/[slug]; ora
 * /research è dei progetti e i paper vivono in /publications/[slug]. Chi
 * arriva da un link salvato o da un motore di ricerca viene rimandato lì.
 *
 * Non redirect(): nell'export statico diventa un rimando fatto da JavaScript
 * dopo il caricamento, invisibile a chi non lo esegue. Il meta refresh è
 * HTML puro, e il canonical dice ai motori di ricerca dov'è la pagina vera.
 *
 * I progetti hanno cartelle proprie (/research/robofluid, ...), che hanno la
 * precedenza su questa rotta dinamica: qui passano solo gli slug dei paper.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await getPapers();
  return data.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata(
  props: PageProps<"/research/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  return {
    title: "Page moved",
    alternates: { canonical: `/publications/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function OldPaperPage(props: PageProps<"/research/[slug]">) {
  const { slug } = await props.params;
  const target = `/publications/${slug}`;

  return (
    <main className="pagina-vuota">
      {/* React lo porta nell'<head>. */}
      <meta httpEquiv="refresh" content={`0; url=${basePath}${target}/`} />
      <h1>This page has moved</h1>
      <p>
        Paper pages are now part of Publications:{" "}
        <Link href={target}>continue to the new page →</Link>
      </p>
    </main>
  );
}
