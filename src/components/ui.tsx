import Link from "next/link";

import { sitoStatico } from "@/lib/site";
import type { ReactNode } from "react";

/** Hero blu delle pagine interne. */
export function InnerHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="hero-interno">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </section>
  );
}

export function Container({ children }: { children: ReactNode }) {
  return <div className="contenitore">{children}</div>;
}

/**
 * Bottone bordato. `variant="outline"` è la versione bianca su fondo blu.
 * Rende un <a> per i link esterni e un <Link> per la navigazione interna.
 */
export function Button({
  href,
  external = false,
  variant = "blu",
  children,
}: {
  href: string;
  external?: boolean;
  variant?: "blu" | "outline";
  children: ReactNode;
}) {
  const className = variant === "blu" ? "btn-blu" : "btn-outline";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * Avviso mostrato quando la pagina sta servendo i contenuti offline invece di
 * quelli del database: vuol dire che Supabase non risponde o che le tabelle
 * non ci sono.
 *
 * Sul sito statico non compare mai. Lì il database non esiste per
 * costruzione — i contenuti vengono da src/lib/data/content.ts ed è il
 * funzionamento previsto, non un guasto da annunciare a chi visita.
 */
export function OfflineNotice({ show }: { show: boolean }) {
  if (!show || sitoStatico) return null;

  return (
    <p className="avviso-offline">
      Contenuti offline — database non raggiungibile
    </p>
  );
}
