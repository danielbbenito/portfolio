"use client";

import { useEffect, useState } from "react";
import { GA_ID, getConsent, setConsent, type Consent } from "@/lib/analytics";

// Asks once whether Google Analytics may set cookies. Hidden if GA isn't configured
// or the visitor has already chosen. PostHog runs without cookies, so it isn't asked about.
export function ConsentBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read the stored choice after mount: localStorage doesn't exist during server rendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (GA_ID && getConsent() === null) setOpen(true);
  }, []);

  if (!open) return null;

  const choose = (value: Consent) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Analytics cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-background"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4">
        <p className="max-w-xl text-sm text-mute">
          May I use Google Analytics cookies to see which projects people read? Nothing is sold or shared
          for ads.
        </p>
        <div className="flex gap-3 font-mono text-xs uppercase tracking-widest">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="border border-rule px-4 py-2 text-mute hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-voidauto"
          >
            No thanks
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="border border-foreground px-4 py-2 text-foreground hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-voidauto"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
}
