"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full animate-pulse rounded-full bg-gradient-to-br from-royal/20 to-transparent" />
  ),
});

export function HeroSceneLoader() {
  return <HeroScene />;
}
