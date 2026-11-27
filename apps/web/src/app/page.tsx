import Link from "next/link";
import { Figure } from "@/components/Figure";
import { Label } from "@/components/Label";
import { LoopVideo } from "@/components/LoopVideo";
import { TitleBlock } from "@/components/TitleBlock";
import { WorldGraphFigure } from "@/components/WorldGraphFigure";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6">
        {/* Intro */}
        <section className="py-20 sm:py-28">
          <Label>Unity / C# developer · Portfolio 2026</Label>
          <h1 className="mt-5 text-6xl font-black uppercase leading-[0.9] tracking-tight font-stretch-extra-condensed sm:text-8xl">
            Daniel B. Benito
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
            <span className="text-foreground">Systems-oriented Unity/C# developer</span> with nearly five
            years in game development, now expanding into full-stack product engineering. Below: three
            game prototypes, and this site itself as the web half of the story.
          </p>
        </section>

        {/* VoidAuto: the featured project */}
        <section id="work" className="scroll-mt-8 border-t border-rule py-16 sm:py-24">
          <Label>01 · Featured · Active prototype / vertical slice</Label>
          <div className="mt-5">
            <TitleBlock accent="voidauto">VoidAuto</TitleBlock>
          </div>
          <div className="mt-6 grid grid-cols-12 gap-x-6 gap-y-4">
            <p className="col-span-12 max-w-2xl text-lg leading-relaxed lg:col-span-8">
              An incremental autobattler / short JRPG. Combat runs itself; the player makes the
              higher-level calls: repositioning on a 2×3 formation, casting spells, choosing targets.
              Built around custom tools that make a large authored world editable and checkable.
            </p>
            <Label className="col-span-12 lg:col-span-4 lg:pt-1.5">
              Unity 6.3 · C# · 2D URP
            </Label>
          </div>

          <div className="mt-10">
            <WorldGraphFigure />
          </div>

          <ul className="mt-10 grid gap-6 border-t border-voidauto/40 pt-6 sm:grid-cols-3">
            {[
              ["World Graph tool", "An editor for rooms, links, timelines and upgrades, with save and validation."],
              ["Constrained encounters", "Encounters built from roles, budgets and formation rules, not random spawns."],
              ["Automation pipeline", "Editor helpers, validators and preflight checks for large implementation passes."],
            ].map(([title, body]) => (
              <li key={title}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-voidauto">{title}</h3>
                <p className="mt-2 text-mute">{body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <Link
              href="/voidauto"
              className="font-mono text-sm uppercase tracking-widest text-voidauto underline decoration-voidauto/40 underline-offset-8 hover:decoration-voidauto"
            >
              Read the case study →
            </Link>
            <Label>Code is private · walkthrough on request</Label>
          </div>
        </section>

        {/* VoidFarm and Fatanis: compact */}
        <section className="grid gap-16 border-t border-rule py-16 sm:py-24 lg:grid-cols-2 lg:gap-12">
          <article>
            <Label>02 · Prototype</Label>
            <div className="mt-5">
              <TitleBlock accent="voidfarm" size="md">VoidFarm</TitleBlock>
            </div>
            <Figure number={2} caption="Garden grid and card hand" className="mt-6">
              <LoopVideo
                src="/media/voidfarm/loop.mp4"
                poster="/media/voidfarm/loop-poster.webp"
                label="VoidFarm gameplay: planting and defending the garden."
                width={1280}
                height={720}
              />
            </Figure>
            <p className="mt-6 leading-relaxed">
              Farming meets tower defense. Plants are persistent farm pieces, not disposable units: grow
              upward, manage how neighbouring plants support each other, and defend a Life Core from
              Daemyn invasions.
            </p>
            <p className="mt-3 leading-relaxed text-mute">
              Built in staged MVPs: smallest testable system, playtest, find the weak spot, revise.
            </p>
            <Label className="mt-4">Unity · C# · Data-driven plant profiles · Save/load</Label>
          </article>

          <article>
            <Label>03 · Earlier prototype</Label>
            <div className="mt-5">
              <TitleBlock accent="fatanis" size="md">Fatanis</TitleBlock>
            </div>
            <Figure number={3} caption="Carrying a cube onto a weight plate" className="mt-6">
              <LoopVideo
                src="/media/fatanis/pressure-plate.mp4"
                poster="/media/fatanis/pressure-plate-poster.webp"
                label="Fatanis: the player picks up a cube and sets it on a pressure plate."
                width={1280}
                height={720}
              />
            </Figure>
            <p className="mt-6 leading-relaxed">
              A 3D survival-horror prototype with many interacting systems in one space: light and
              perception rules, carryable objects, weight plates and gates, reusable reset logic.
            </p>
            <p className="mt-3 leading-relaxed text-mute">
              Its main lesson: cut scope once too many systems pile up.
            </p>
            <Label className="mt-4">Unity · C# · 3D</Label>
          </article>
        </section>

        {/* How this site was built: teaser */}
        <section className="grid grid-cols-12 gap-6 border-t border-rule py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-4">
            <Label>04 · This site</Label>
            <div className="mt-5">
              <TitleBlock accent="bone" size="md">How it&rsquo;s built</TitleBlock>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <p className="max-w-2xl text-lg leading-relaxed">
              My first full-stack project: a Next.js front end, a NestJS contact API backed by PostgreSQL,
              and one analytics wrapper feeding PostHog and GA4. Built with AI-assisted development, with
              the decisions, trade-offs and measurements written up.
            </p>
            <Link
              href="/how-this-site-was-built"
              className="mt-6 inline-block font-mono text-sm uppercase tracking-widest underline decoration-mute underline-offset-8 hover:decoration-foreground"
            >
              Read the build notes →
            </Link>
          </div>
        </section>

        {/* About & experience */}
        <section id="about" className="grid scroll-mt-8 grid-cols-12 gap-6 border-t border-rule py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-4">
            <Label>05 · About</Label>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <p className="max-w-2xl text-lg leading-relaxed">
              I started in QA, then moved into Unity/C# engineering on existing production codebases:
              implementing, debugging and maintaining gameplay features, and breaking work down into
              estimates for client proposals. Lately I build gameplay systems and the tools around them.
            </p>

            <dl className="mt-10 divide-y divide-rule border-y border-rule">
              {[
                ["Aug 2025 – Nov 2026", "Creight Games", "Unity Developer (part-time / contract)", "Gameplay systems and development tools for an ongoing project."],
                ["Jan 2022 – Jul 2025", "Secret 6", "QA Tester → Game Engineer Trainee → Junior Game Engineer", "Gameplay features and bug fixing in production codebases."],
              ].map(([dates, company, role, summary]) => (
                <div key={company} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-mono text-xs uppercase tracking-wider text-mute sm:pt-1">{dates}</dt>
                  <dd>
                    <p className="font-semibold">{company}</p>
                    <p className="text-mute">{role}</p>
                    <p className="mt-2">{summary}</p>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm text-mute">
              BS Entertainment Media Computing, CIIT College of Arts and Technology · 3 years of BS
              Architecture, UP Diliman
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="grid scroll-mt-8 grid-cols-12 gap-6 border-t border-rule py-16 sm:py-24">
          <div className="col-span-12 lg:col-span-4">
            <Label>06 · Contact</Label>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <a
              href="mailto:juamibenito8@gmail.com"
              className="text-3xl font-black tracking-tight font-stretch-extra-condensed break-all hover:text-voidauto sm:text-5xl"
            >
              juamibenito8@gmail.com
            </a>
            <p className="mt-4 font-mono text-sm uppercase tracking-widest">
              <a
                href="https://github.com/danielbbenito"
                className="text-mute underline decoration-rule underline-offset-8 hover:text-foreground"
              >
                GitHub ↗
              </a>
            </p>
          </div>
        </section>
      </main>
  );
}
