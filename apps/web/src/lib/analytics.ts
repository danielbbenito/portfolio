import posthog from "posthog-js";

// ─── Event schema ─────────────────────────────────────────────────────────────
// Every custom event the site sends, defined once. `track()` only accepts these names,
// with these properties, so a typo is a compile error rather than a silently lost event.
// Page views are automatic in both tools and are not listed here.
export type AnalyticsEvents = {
  /** A "read the case study" link was clicked. */
  case_study_opened: { project: "voidauto"; from: "home" };
  /** The contact form was accepted by the API. */
  contact_submitted: Record<string, never>;
  /** The contact form failed; `reason` says why. */
  contact_failed: { reason: "validation" | "rate_limited" | "network" };
  /** The email address or GitHub link was clicked. */
  outbound_clicked: { target: "email" | "github" };
};

export type AnalyticsEvent = keyof AnalyticsEvents;

// Events that also go to Google Analytics; mark them as key events in GA4.
const GA_EVENTS: AnalyticsEvent[] = ["contact_submitted", "case_study_opened"];

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// ─── Setup ────────────────────────────────────────────────────────────────────
// PostHog runs for everyone but stores nothing on the visitor's device (memory only, no cookies),
// so each visit counts on its own. Google Analytics sets cookies, so it loads only after consent.
export function initAnalytics() {
  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      defaults: "2026-05-30", // includes page views on client-side navigation
      persistence: "memory",
      disable_session_recording: true,
      disable_surveys: true,
    });
  }
  if (getConsent() === "granted") loadGoogleAnalytics();
}

/** Send one event to every analytics tool that is switched on. Never throws. */
export function track<E extends AnalyticsEvent>(event: E, props: AnalyticsEvents[E]) {
  try {
    if (POSTHOG_KEY) posthog.capture(event, props);
    if (window.gtag && GA_EVENTS.includes(event)) window.gtag("event", event, props);
  } catch {
    // Analytics must never break the page.
  }
}

// ─── Consent (Google Analytics only) ──────────────────────────────────────────
const CONSENT_KEY = "analytics-consent";
export type Consent = "granted" | "denied";

export function getConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Private mode etc.: the choice just won't be remembered.
  }
  if (value === "granted") loadGoogleAnalytics();
}

let gaLoaded = false;
function loadGoogleAnalytics() {
  if (!GA_ID || gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag expects the real `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID); // GA4 counts page views itself, including client-side navigation
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}
