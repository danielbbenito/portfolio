// A slanted, accent-coloured title block (board C "Hybrid").
// The block is skewed; the text inside is skewed back so it stays upright.
type Accent = "voidauto" | "voidfarm" | "fatanis" | "bone";

const backgrounds: Record<Accent, string> = {
  voidauto: "bg-voidauto",
  voidfarm: "bg-voidfarm",
  fatanis: "bg-fatanis",
  bone: "bg-foreground",
};

type TitleBlockProps = {
  accent: Accent;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "md";
};

export function TitleBlock({ accent, children, as: Tag = "h2", size = "lg" }: TitleBlockProps) {
  const text = size === "lg" ? "text-5xl sm:text-7xl" : "text-3xl sm:text-4xl";
  return (
    <Tag className="title-wipe inline-block">
      <span className={`inline-block -skew-x-12 px-4 py-1 ${backgrounds[accent]}`}>
        <span
          className={`inline-block skew-x-12 font-black uppercase leading-none tracking-tight font-stretch-extra-condensed text-background ${text}`}
        >
          {children}
        </span>
      </span>
    </Tag>
  );
}
