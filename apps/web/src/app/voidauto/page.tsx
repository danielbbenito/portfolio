import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Figure } from "@/components/Figure";
import { Label } from "@/components/Label";
import { LoopVideo } from "@/components/LoopVideo";
import { TitleBlock } from "@/components/TitleBlock";

// Each page can set its own <title> and description; this one overrides the layout's.
export const metadata: Metadata = {
  title: "VoidAuto case study — Daniel B. Benito",
  description:
    "An incremental autobattler prototype in Unity/C#, and the authoring tools, constrained encounter generation and automation behind it.",
};

const facts = [
  ["Genre", "Incremental autobattler / short JRPG"],
  ["Engine", "Unity 6.3 LTS · C# · 2D URP"],
  ["Status", "Active prototype · vertical slice, not released"],
  ["Scope", "~48–50 rooms planned for the slice"],
  ["Code", "Private · walkthrough on request"],
];

// One story section: number, title, intro, then whatever figures/lists it needs.
function Story({
  n,
  title,
  lead,
  children,
}: {
  n: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule py-16 sm:py-24">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <Label className="text-voidauto">Story {n}</Label>
          <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight font-stretch-extra-condensed sm:text-5xl">
            {title}
          </h2>
        </div>
        <p className="col-span-12 max-w-2xl text-lg leading-relaxed lg:col-span-8">{lead}</p>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

// A bulleted list with gold square markers.
function Points({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-voidauto" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function VoidAutoPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6">
      {/* Header */}
      <section className="py-16 sm:py-20">
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-widest text-mute hover:text-foreground"
        >
          ← All work
        </Link>
        <Label className="mt-10">Case study · 01</Label>
        <div className="mt-5">
          <TitleBlock accent="voidauto" as="h1">VoidAuto</TitleBlock>
        </div>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed">
          Automated combat with tactical intervention. Basic attacks run on their own; the player makes
          the higher-level calls without the game turning turn-based. Much of the engineering is in the
          tools behind it: authoring a large world, generating encounters inside rules, and applying
          changes safely.
        </p>

        <dl className="mt-10 grid border-y border-rule sm:grid-cols-5">
          {facts.map(([term, value]) => (
            <div key={term} className="border-rule py-4 sm:border-l sm:px-4 sm:first:border-l-0 sm:first:pl-0">
              <dt className="font-mono text-xs uppercase tracking-widest text-voidauto">{term}</dt>
              <dd className="mt-1 text-sm">{value}</dd>
            </div>
          ))}
        </dl>

        <Figure number={1} caption="World map → combat → detail panels → map" className="mt-12">
          <LoopVideo
            src="/media/voidauto/overview.mp4"
            poster="/media/voidauto/overview-poster.webp"
            label="VoidAuto gameplay: moving on the world map, entering combat and inspecting units."
            width={1280}
            height={694}
          />
        </Figure>
      </section>

      {/* The game in one screen */}
      <section className="border-t border-rule py-16 sm:py-24">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <Label>The core loop</Label>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight font-stretch-extra-condensed sm:text-5xl">
              Position matters
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <p className="max-w-2xl text-lg leading-relaxed">
              Each side fights on a 2 × 3 formation: six positions, twelve tiles in total. The player
              repositions allies, swaps in reserves, casts spells and picks targets while combat keeps
              moving, and can pause or change speed.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-mute">
              Stats include attack, attack speed, HP, defence, spirit and mana gain, with physical and
              elemental damage and enemy weaknesses to exploit.
            </p>
          </div>
        </div>
        <Figure
          number={2}
          caption="Combat, paused. Allies left, enemies right; spells and speed controls (0.25× – 4×)"
          className="mt-10"
        >
          <Image
            src="/media/voidauto/combat.webp"
            alt="VoidAuto combat screen: two allied units and two enemies on facing 2-by-3 grids, a Radiance meter, speed buttons and a spell bar."
            width={1550}
            height={1007}
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="block h-auto w-full"
          />
        </Figure>
      </section>

      <Story
        n="01"
        title="World Graph tool"
        lead="A dungeon of ~50 rooms across regions and alternate timelines is hard to hold in your head. So I built an editor where the world is a graph: rooms are nodes, travel links are edges, and every room's settings sit in one inspector."
      >
        <Figure number={3} caption="World Graph Author: regions, timelines, links and the room inspector">
          <Image
            src="/media/voidauto/world-graph-author.webp"
            alt="The World Graph Author editor window: room nodes connected by dashed and solid links across labelled regions and timelines, with an inspector panel for the selected combat room."
            width={1919}
            height={910}
            sizes="(min-width: 1152px) 1104px, 100vw"
            className="block h-auto w-full"
          />
        </Figure>
        <div className="mt-10">
          <Points
            items={[
              "Room, upgrade and travel-link nodes, edited directly on the graph",
              "Timeline lanes and alternate-timeline relationships",
              "Auto-layout, find, save and a Validate pass",
              "Per-room inspector: enemy introductions, encounter, budget, first-clear rewards",
              "Boss-domain references, branch records and upgrade layout data",
              "Opens the Encounter Author for the selected room",
            ]}
          />
        </div>
      </Story>

      <Story
        n="02"
        title="Constrained encounters"
        lead="Random spawns make random fights. Encounters here are generated inside rules: a difficulty budget, the enemies the player has already been introduced to, and per-tile constraints on the 2 × 3 formation, so fights can be designed as small combat puzzles."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <Figure number={4} caption="Authored encounter: budget 900, level fit 903 / 900 (within ±5)">
            <Image
              src="/media/voidauto/encounter-author-formation.webp"
              alt="Encounter Author showing a 2-by-3 enemy formation with front, middle and back tiles, each with an enemy, level and pin option."
              width={1919}
              height={910}
              sizes="(min-width: 1024px) 540px, 100vw"
              className="block h-auto w-full"
            />
          </Figure>
          <Figure number={5} caption="Generated room: seeded preview, 6 enemies, spent 665 / 900">
            <Image
              src="/media/voidauto/encounter-author-rooms.webp"
              alt="Encounter Author rooms tab: a generated room resolving an enemy pool from region and depth, with a seeded preview of six enemies."
              width={1919}
              height={910}
              sizes="(min-width: 1024px) 540px, 100vw"
              className="block h-auto w-full"
            />
          </Figure>
        </div>
        <h3 className="mt-12 font-mono text-xs uppercase tracking-widest text-voidauto">
          Rules the generator&rsquo;s check script asserts
        </h3>
        <div className="mt-5">
          <Points
            items={[
              "A pinned enemy stays in its exact tile",
              "Per-tile role constraints are honoured",
              "Minimum and maximum enemy counts are respected",
              "No empty tile in front of an occupied one",
              "A conflict fails loudly instead of silently swapping an enemy",
              "An impossible budget returns nothing, never a half-built formation",
            ]}
          />
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-mute">
          Current state: generation runs as a seeded preview in the editor, and a preview can be saved as
          an authored encounter. Rolling encounters on room entry is planned, not built.
        </p>
      </Story>

      <Story
        n="03"
        title="Automation & acceptance"
        lead="Features land as small, named slices, each with its own editor command. The command opens the main scene, wires up components and data, and refuses to run if the scene isn't in the state it expects, rather than half-applying a change."
      >
        <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
          {[
            ["234", "editor automation scripts, one per slice or fix"],
            ["41", "focused check scripts that assert gameplay rules"],
            ["119", "of those for the world graph and encounters"],
          ].map(([value, label]) => (
            <div key={label} className="bg-background p-6">
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block text-5xl font-black tracking-tight font-stretch-extra-condensed text-voidauto">
                  {value}
                </span>
                <span className="mt-2 block font-mono text-xs uppercase tracking-wider text-mute">
                  {label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <Label className="mt-3">Counted from the project, November 2026</Label>
        <div className="mt-10">
          <Points
            items={[
              "Editor helpers for component setup, ScriptableObject generation and scene wiring",
              "Validators and preflight checks before anything is written",
              "Python writers for multi-script implementation passes, with safer file writing",
              "Rollback-friendly workflow on top of Git",
              "Focused context exporters for working with AI assistants",
              "In-game showcase capture tools for clean screenshots and timed takes",
            ]}
          />
        </div>
      </Story>

      {/* Lessons */}
      <section className="border-t border-rule py-16 sm:py-24">
        <Label>What I took from it</Label>
        <ol className="mt-8 grid gap-10 lg:grid-cols-3">
          {[
            [
              "Written is not accepted",
              "\"The code exists\" and \"the feature passed Play Mode acceptance\" are different states. I track them separately and say which one I mean.",
            ],
            [
              "Tools are part of the game",
              "A world of ~50 rooms only stays consistent if it can be seen and validated. The graph editor and encounter rules are what make that possible.",
            ],
            [
              "Scope on purpose",
              "The vertical slice focuses on four of the six planned characters; the other two are held back for later.",
            ],
          ].map(([title, body], i) => (
            <li key={title} className="border-t-2 border-voidauto pt-5">
              <span className="font-mono text-xs text-voidauto">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-2xl font-black uppercase tracking-tight font-stretch-extra-condensed">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-mute">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Call to action */}
      <section className="border-t border-rule py-16 sm:py-24">
        <p className="max-w-2xl text-2xl leading-snug">
          The code is private, but I&rsquo;m happy to walk through any part of it on a call.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 font-mono text-sm uppercase tracking-widest">
          <Link
            href="/#contact"
            className="text-voidauto underline decoration-voidauto/40 underline-offset-8 hover:decoration-voidauto"
          >
            Get in touch →
          </Link>
          <Link href="/#work" className="text-mute underline decoration-rule underline-offset-8 hover:text-foreground">
            ← Back to all work
          </Link>
        </div>
      </section>
    </main>
  );
}
