import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { SourceCredit } from "@/components/source-credit";
import { Button } from "@/components/ui";
import { VideoEmbed } from "@/components/video-embed";
import type { TeamMember } from "@/lib/data/projects";
import { asset } from "@/lib/site";
import type { Source } from "@/lib/sources";
import type { Person } from "@/lib/types";

/**
 * Mattoni delle pagine progetto (/research/<slug>). Riusano le classi delle
 * pagine paper — hero blu, striscia dei dati, corpo a colonna — e ne
 * aggiungono poche, in fondo a globals.css sotto "PROGETTI".
 */

export type ImageData = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

/** Figura con didascalia e, sotto, l'articolo da cui viene. */
export function Figure({
  image,
  caption,
  source,
}: {
  image: ImageData;
  caption?: ReactNode;
  source: Source | null;
}) {
  return (
    <figure className="paper-media">
      <Image
        src={asset(image.url)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 900px) 100vw, 820px"
      />
      <figcaption className="didascalia">
        {caption} <SourceCredit source={source} />
      </figcaption>
    </figure>
  );
}

/** Video di YouTube con didascalia e, se c'è, l'articolo a cui si riferisce. */
export function Video({
  youtubeId,
  title,
  caption,
  source = null,
}: {
  youtubeId: string;
  title: string;
  caption: ReactNode;
  source?: Source | null;
}) {
  return (
    <figure className="paper-media">
      <div className="player">
        <VideoEmbed
          youtubeId={youtubeId}
          title={title}
          fallbackLabel={`Video — ${title}`}
        />
      </div>
      <figcaption className="didascalia">
        {caption} <SourceCredit source={source} />
      </figcaption>
    </figure>
  );
}

/** Due figure o due video affiancati; su telefono uno sotto l'altro. */
export function FigurePair({ children }: { children: ReactNode }) {
  return <div className="coppia-figure">{children}</div>;
}

/**
 * Un risultato del progetto: un articolo, con titolo, autori e figure.
 * `id` è l'ancora a cui puntano i "Learn more" di /publications.
 */
export function Result({
  id,
  venue,
  title,
  authors,
  children,
  actions,
}: {
  id?: string;
  venue: string;
  title: string;
  authors: string;
  children: ReactNode;
  actions?: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <section className="risultato" id={id}>
      <span className="rivista-progetto">{venue}</span>
      <h3>{title}</h3>
      <div className="autori-risultato">{authors}</div>
      {children}
      {actions && actions.length > 0 && (
        <div className="azioni-risultato">
          {actions.map((a) => (
            <Button key={a.href} href={a.href} external={a.external}>
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </section>
  );
}

export type GrantRow = { label: string; value: ReactNode };

/**
 * Scheda del finanziamento: logo, dati del grant (da CORDIS) e la frase di
 * riconoscimento che i beneficiari UE devono riportare insieme all'emblema.
 */
export function FundingBox({
  title,
  logos,
  rows,
  statement,
  links,
}: {
  title: string;
  logos: (ImageData & { height: number; altezza: number })[];
  rows: GrantRow[];
  statement: string;
  links: { href: string; label: string }[];
}) {
  return (
    <aside className="scheda-grant">
      <div className="testa">
        <h3>{title}</h3>
        <div className="loghi-grant">
          {logos.map((logo) => (
            <Image
              key={logo.url}
              src={asset(logo.url)}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              style={{ height: logo.altezza }}
              unoptimized
            />
          ))}
        </div>
      </div>
      <dl>
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="dichiarazione">{statement}</p>
      <div className="azioni-risultato">
        {links.map((l) => (
          <Button key={l.href} href={l.href} external>
            {l.label}
          </Button>
        ))}
      </div>
    </aside>
  );
}

export type PublicationEntry = {
  authors: string;
  title: string;
  venue: string;
  links: { href: string; label: string; external?: boolean }[];
};

/** Elenco delle pubblicazioni di un progetto, in formato citazione. */
export function PublicationList({ items }: { items: PublicationEntry[] }) {
  return (
    <ol className="elenco-pub">
      {items.map((p) => (
        <li key={p.title}>
          <span className="autori-cit">{p.authors}</span>{" "}
          <span className="titolo-cit">{p.title}.</span> <em>{p.venue}</em>
          <span className="link-cit">
            {p.links.map((l) =>
              l.external === false ? (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} target="_blank" rel="noopener">
                  {l.label}
                </a>
              ),
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}

/**
 * Il gruppo che lavora al progetto. Chi è in /people (stringa = slug) prende
 * da lì foto, ruolo e profilo; gli altri hanno solo nome e, se noto, ruolo,
 * e al posto della foto le iniziali.
 */
export function Team({
  members,
  people,
}: {
  members: TeamMember[];
  people: Person[];
}) {
  type Member = {
    name: string;
    role?: string;
    url?: string | null;
    photo: string | null;
  };
  const resolved = members.flatMap((m): Member[] => {
    if (typeof m !== "string") return [{ ...m, photo: null }];
    const p = people.find((person) => person.slug === m);
    if (!p) return [];
    return [
      { name: p.name, role: p.role, url: p.profile_url, photo: p.photo_url },
    ];
  });

  return (
    <ul className="squadra">
      {resolved.map((m) => {
        const initials = m.name
          .split(" ")
          .map((w) => w[0])
          .join("");
        const body = (
          <>
            <span className="ritratto">
              {m.photo ? (
                <Image src={asset(m.photo)} alt="" fill sizes="64px" />
              ) : (
                <span aria-hidden="true">{initials}</span>
              )}
            </span>
            <span>
              <span className="nome">{m.name}</span>
              {m.role && <span className="ruolo-membro">{m.role}</span>}
            </span>
          </>
        );
        return (
          <li key={m.name}>
            {!m.url ? (
              <div className="membro">{body}</div>
            ) : m.url.startsWith("/") ? (
              <Link className="membro" href={m.url}>
                {body}
              </Link>
            ) : (
              <a className="membro" href={m.url} target="_blank" rel="noopener">
                {body}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
