// Temporary page: checks that the colour tokens work. Replaced when we build the real homepage.
const accents = [
  { name: "VoidAuto", swatch: "bg-voidauto" },
  { name: "VoidFarm", swatch: "bg-voidfarm" },
  { name: "Fatanis", swatch: "bg-fatanis" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-24">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-sm uppercase tracking-widest text-mute">
          Style check · temporary page
        </p>
        <h1 className="text-4xl font-bold uppercase">Daniel B. Benito</h1>
        <p className="max-w-prose text-lg text-mute">
          Unity/C# systems developer moving into full-stack product engineering.
        </p>
      </div>

      <hr className="border-rule" />

      <ul className="flex flex-col gap-4">
        {accents.map((accent) => (
          <li key={accent.name} className="flex items-center gap-4">
            <span className={`h-6 w-16 ${accent.swatch}`} />
            <span className="font-mono text-sm">{accent.name}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
