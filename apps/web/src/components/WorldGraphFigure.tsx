import Image from "next/image";

// The VoidAuto hero: the in-game world graph, with leader-line labels.
// Each note's x/y is a percentage of the image, so the dots stay on target at any size.
const notes = [
  { n: 1, label: "Current room", detail: "marked in gold", x: 55.9, y: 20.8 },
  { n: 2, label: "Lock / meta key", detail: "locked link, needs 1 meta key", x: 51.9, y: 55.4 },
  { n: 3, label: "One-way shortcut", detail: "travel in one direction only", x: 37.9, y: 72.4 },
];

export function WorldGraphFigure() {
  return (
    <figure className="grid grid-cols-12 gap-x-6">
      {/* Image: 8 of 12 columns on wide screens, full width on phones */}
      <div className="relative col-span-12 border border-rule lg:col-span-8">
        <Image
          src="/media/voidauto/world-graph.webp"
          alt="VoidAuto's in-game world graph: room nodes joined by travel links, with the current room highlighted, locked branches and one-way shortcuts."
          width={1552}
          height={1008}
          sizes="(min-width: 1024px) 760px, 100vw"
          loading="eager"
          fetchPriority="high"
          className="block h-auto w-full"
        />
        {notes.map((note) => (
          <span key={note.n} aria-hidden="true">
            {/* Hollow ring around the target, so the node itself stays visible */}
            <span
              className="absolute size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-voidauto"
              style={{ left: `${note.x}%`, top: `${note.y}%` }}
            />
            {/* Number tag just above-left of the ring (shown on phones, where there are no leader lines) */}
            <span
              className="absolute -translate-x-[150%] -translate-y-[150%] bg-voidauto px-1 font-mono text-[10px] font-bold text-background lg:hidden"
              style={{ left: `${note.x}%`, top: `${note.y}%` }}
            >
              {note.n}
            </span>
            {/* Leader line from the ring out past the right edge (wide screens only) */}
            <span
              className="absolute hidden h-px bg-voidauto/70 lg:block"
              style={{ left: `calc(${note.x}% + 18px)`, right: "-24px", top: `${note.y}%` }}
            />
          </span>
        ))}
      </div>

      {/* Labels: beside the image on wide screens (lined up with the leader lines), a list on phones */}
      <ol className="relative col-span-12 mt-4 flex flex-col gap-3 lg:col-span-4 lg:mt-0 lg:block">
        {notes.map((note) => (
          <li
            key={note.n}
            className="flex gap-3 lg:absolute lg:-translate-y-1/2"
            style={{ top: `${note.y}%` }}
          >
            <span className="font-mono text-xs text-voidauto">{String(note.n).padStart(2, "0")}</span>
            <span>
              <span className="block font-mono text-xs uppercase tracking-wider text-foreground">
                {note.label}
              </span>
              <span className="block font-mono text-xs text-mute">{note.detail}</span>
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="col-span-12 mt-3 font-mono text-xs uppercase tracking-wider text-mute">
        Fig 1 — In-game world graph. Rooms reveal as they are reached.
      </figcaption>
    </figure>
  );
}
