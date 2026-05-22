const TESTFLIGHT_URL = "https://testflight.apple.com/join/jKXRVhSz";

interface AppStoreButtonProps {
  className?: string;
}

export default function AppStoreButton({ className = "" }: AppStoreButtonProps) {
  return (
    <a
      href={TESTFLIGHT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join the beta"
      className={`inline-flex items-center justify-center bg-scene-surface border border-scene-border text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/5 active:scale-95 transition-all duration-150 ${className}`}
    >
      Join the beta
    </a>
  );
}
