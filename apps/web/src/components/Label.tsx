// Small mono label used above sections and for metadata.
export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-xs uppercase tracking-widest text-mute ${className}`}>{children}</p>
  );
}
