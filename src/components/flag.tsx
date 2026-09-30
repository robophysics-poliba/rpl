/**
 * Bandierina del paese di provenienza, mostrata nella scheda di /people.
 *
 * Disegnata inline invece che come emoji: le emoji delle bandiere non
 * esistono su Windows, dove 🇯🇵 diventa la sigla "JP". Un SVG si vede
 * ovunque allo stesso modo.
 *
 * `country` è un codice ISO 3166-1 alpha-2. I paesi non previsti non
 * rendono nulla, così aggiungerne uno è l'unica modifica necessaria.
 */
const bandiere: Record<string, { nome: string; disegno: React.ReactNode }> = {
  JP: {
    nome: "Japan",
    disegno: (
      <>
        <rect width="30" height="20" fill="#fff" />
        <circle cx="15" cy="10" r="6" fill="#bc002d" />
      </>
    ),
  },
};

export function Flag({ country }: { country: string | null }) {
  const bandiera = country ? bandiere[country] : undefined;
  if (!bandiera) return null;

  return (
    <svg
      className="bandiera"
      viewBox="0 0 30 20"
      role="img"
      aria-label={bandiera.nome}
    >
      {bandiera.disegno}
    </svg>
  );
}
