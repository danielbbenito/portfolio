import Link from "next/link";

// Shared top bar. Links start with "/" so they work from any page, not just the homepage.
export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 font-mono text-xs uppercase tracking-widest">
        <Link href="/" className="text-foreground hover:text-voidauto focus-visible:text-voidauto">
          Daniel B. Benito
        </Link>
        <ul className="flex gap-5 text-mute">
          <li><Link href="/#work" className="hover:text-foreground">Work</Link></li>
          <li><Link href="/#about" className="hover:text-foreground">About</Link></li>
          <li><Link href="/#contact" className="hover:text-foreground">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
