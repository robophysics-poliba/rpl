import type { Source } from "@/lib/sources";

/**
 * Didascalia con la fonte di un'immagine o di un video: l'articolo da cui è
 * tratta, con il link. Solo il riferimento, senza "Source:" davanti.
 *
 *   overlay   sovrapposta al bordo basso dell'immagine (anteprime delle card)
 *   link      false dentro una card che è già tutta un link: un <a> dentro
 *             un altro <a> non è HTML valido
 */
export function SourceCredit({
  source,
  overlay = false,
  link = true,
}: {
  source: Source | null;
  overlay?: boolean;
  link?: boolean;
}) {
  if (!source) return null;

  return (
    <span className={overlay ? "fonte sovrapposta" : "fonte"}>
      {link && source.url ? (
        <a href={source.url} target="_blank" rel="noopener">
          {source.label}
        </a>
      ) : (
        source.label
      )}
    </span>
  );
}
