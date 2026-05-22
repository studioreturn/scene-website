"use client";

import JoinBetaButton from "./JoinBetaButton";

interface AppStoreButtonProps {
  className?: string;
}

export default function AppStoreButton({ className = "" }: AppStoreButtonProps) {
  return (
    <JoinBetaButton
      className={`inline-flex items-center justify-center bg-scene-surface border border-scene-border text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/5 active:scale-95 transition-all duration-150 ${className}`}
    />
  );
}
