# Analytics

One function, `track(event, props)` in [`apps/web/src/lib/analytics.ts`](../apps/web/src/lib/analytics.ts), sends every custom event. The event names and their properties are a TypeScript type there, so the code can't send an event that isn't on this list.

## Tools

| Tool | What it gets | Cookies | When it runs |
|---|---|---|---|
| PostHog | Page views (including client-side navigation), autocaptured clicks, and every event below | None: memory only, so each visit counts on its own | Always, when `NEXT_PUBLIC_POSTHOG_KEY` is set |
| Google Analytics 4 | Page views, plus the two events marked GA below | `_ga` cookies | Only after the visitor clicks **Allow** in the consent bar, and only when `NEXT_PUBLIC_GA_ID` is set |

Session recording and surveys are off.

## Events

| Event | Properties | Fired when | Sent to |
|---|---|---|---|
| `case_study_opened` | `project: "voidauto"`, `from: "home"` | The homepage "Read the case study" link is clicked | PostHog, GA (key event) |
| `contact_submitted` | none | The API accepts the contact form | PostHog, GA (key event) |
| `contact_failed` | `reason: "validation" \| "rate_limited" \| "network"` | The contact form gets an error | PostHog |
| `outbound_clicked` | `target: "email" \| "github"` | The email address or GitHub link is clicked | PostHog |

## Questions this should answer

- Do visitors open the VoidAuto case study, and from where? (page views → `case_study_opened`)
- Of those who reach the contact section, how many send a message? (funnel: home page view → `contact_submitted`)
- When the form fails, why? (`contact_failed.reason`)

## Adding an event

1. Add it to `AnalyticsEvents` in `analytics.ts` (name + properties).
2. Call `track("new_event", { ... })` where it happens, or use `<TrackedLink>` for a link.
3. Add a row to the table above. If it should go to GA, add it to `GA_EVENTS` and mark it as a key event in GA4.
