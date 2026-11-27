"use client";

// A short, muted gameplay clip.
// It plays only while on screen, and never autoplays for people who ask for reduced motion:
// they get the poster image and normal video controls instead.
import { useEffect, useRef, useState } from "react";

type LoopVideoProps = {
  src: string;
  poster: string;
  label: string; // describes the clip for screen readers
  width: number;
  height: number;
};

export function LoopVideo({ src, poster, label, width, height }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);
    if (prefersReduced) return;

    // Like OnBecameVisible / OnBecameInvisible in Unity: play when in view, pause when not.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      controls={reducedMotion}
      className="block h-auto w-full bg-black"
    />
  );
}
