import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SourceCredit } from "@/components/source-credit";
import { Container, InnerHero, OfflineNotice } from "@/components/ui";
import { projects } from "@/lib/data/projects";
import { getPapers } from "@/lib/queries";
import { asset, site } from "@/lib/site";
import { sourceFor } from "@/lib/sources";

export const revalidate = 300;

const intro =
  "The research projects and grants hosted at the RoboPhysics Laboratory: from fluids driven by electric fields to soft grippers with electroactive contacts.";

export const metadata: Metadata = {
  title: "Research",
  description: intro,
  alternates: { canonical: "/research" },
};

export default async function ResearchPage() {
  // Serve solo per la didascalia delle foto che vengono da un paper.
  const { data: papers, offline } = await getPapers();

  return (
    <main>
      <InnerHero eyebrow="Research" title="Projects and grants">
        {intro}
      </InnerHero>

      {/* Le card restano figlie dirette di .contenitore: è da lì che
          .card-ricerca:nth-child(even) ricava l'alternanza delle colonne. */}
      <Container>
        {projects.map((project) => (
          <Link
            className="card-ricerca"
            href={`/research/${project.slug}`}
            key={project.slug}
          >
            <div className="media">
              <Image
                src={asset(project.image.url)}
                alt={project.image.alt}
                fill
                sizes="(max-width: 960px) 100vw, 45vw"
              />
              {/* Tutta la card è un link: la fonte qui è solo testo. */}
              <SourceCredit
                source={
                  project.image.source ?? sourceFor(papers, project.image.paper)
                }
                overlay
                link={false}
              />
            </div>
            <div className="corpo">
              <span className="rivista">{project.badge}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <p className="meta-progetto">{project.meta}</p>
              <span className="leggi-di-piu">Learn more →</span>
            </div>
          </Link>
        ))}
      </Container>

      <section className="cta-spinoff">
        <a
          href={site.spinoff.url}
          target="_blank"
          rel="noopener"
          aria-label={`${site.spinoff.name} — spin-off (opens in a new tab)`}
        >
          <Image
            src={asset("/omnigrasp.png")}
            alt={`${site.spinoff.name}, spin-off of the laboratory`}
            width={252}
            height={193}
          />
        </a>
      </section>

      <OfflineNotice show={offline} />
    </main>
  );
}
