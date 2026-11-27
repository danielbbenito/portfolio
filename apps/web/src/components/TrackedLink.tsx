"use client";

import Link from "next/link";
import { track, type AnalyticsEvent, type AnalyticsEvents } from "@/lib/analytics";

type Props<E extends AnalyticsEvent> = React.ComponentProps<"a"> & {
  href: string;
  event: E;
  eventProps: AnalyticsEvents[E];
};

// A link that sends an analytics event when clicked. Internal paths use Next's <Link>.
export function TrackedLink<E extends AnalyticsEvent>({ href, event, eventProps, onClick, ...rest }: Props<E>) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track(event, eventProps);
    onClick?.(e);
  };
  if (href.startsWith("/")) return <Link href={href} onClick={handleClick} {...rest} />;
  return <a href={href} onClick={handleClick} {...rest} />;
}
