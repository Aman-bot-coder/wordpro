import { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`${dark ? "glass-dark" : "glass"} rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
