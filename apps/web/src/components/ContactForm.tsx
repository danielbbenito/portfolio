"use client";

import { useEffect, useRef, useState } from "react";

// Where the API lives. Set NEXT_PUBLIC_API_URL in production; locally the API runs on port 3001.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const field =
  "mt-2 block w-full border border-rule bg-transparent px-3 py-2.5 text-base text-foreground " +
  "placeholder:text-mute/60 focus:border-voidauto focus:outline-none";
const label = "font-mono text-xs uppercase tracking-widest text-mute";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // When the form first appeared. The API drops messages sent faster than a person could type.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
    // The free API host sleeps when idle and takes a while to wake.
    // Ping it now, so it's awake by the time someone finishes typing.
    fetch(`${API_URL}/health`).catch(() => {});
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: "sending" });

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
          startedAt: startedAt.current,
        }),
      });

      if (res.ok) {
        form.reset();
        setStatus({ kind: "sent" });
      } else if (res.status === 429) {
        setStatus({ kind: "error", message: "Too many messages from this address. Please try again later, or email me directly." });
      } else if (res.status === 400) {
        const body = await res.json().catch(() => null);
        const reasons: string[] = Array.isArray(body?.message) ? body.message : [];
        // The API prefixes each reason with the field name ("email: …"); show just the reason.
        const text = reasons.map((r) => r.replace(/^\w+: /, "")).join(". ");
        setStatus({ kind: "error", message: text || "Please check the form and try again." });
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch {
      setStatus({ kind: "error", message: "Couldn’t send right now. Please email me directly instead." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="border-l-2 border-voidfarm py-2 pl-5">
        <p className="text-xl">Thanks, your message is in.</p>
        <p className="mt-2 text-mute">I’ll reply by email.</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-5 font-mono text-xs uppercase tracking-widest text-mute underline decoration-rule underline-offset-8 hover:text-foreground"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Name</span>
        <input name="name" required maxLength={100} autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className={label}>Email</span>
        <input name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Message</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={6} className={`${field} resize-y`} />
      </label>

      {/* Honeypot: hidden from people and screen readers; bots that fill every field get dropped. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="border border-voidauto bg-voidauto px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-voidauto disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
        <p role="alert" aria-live="polite" className="text-sm text-[#FF8A7A]">
          {status.kind === "error" ? status.message : null}
        </p>
      </div>
    </form>
  );
}
