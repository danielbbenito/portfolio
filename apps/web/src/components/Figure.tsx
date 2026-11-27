// A figure with a mono caption: "FIG 1 — ...".
type FigureProps = {
  number: number;
  caption: string;
  children: React.ReactNode;
  className?: string;
};

export function Figure({ number, caption, children, className = "" }: FigureProps) {
  return (
    <figure className={className}>
      <div className="border border-rule">{children}</div>
      <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-mute">
        Fig {number} — {caption}
      </figcaption>
    </figure>
  );
}
