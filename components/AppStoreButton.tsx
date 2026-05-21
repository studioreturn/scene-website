// TODO: Replace APP_STORE_URL with the real App Store link once the app is live.
// e.g. "https://apps.apple.com/gb/app/scene/id<APP_STORE_ID>"
// For now the button links to the App Store search page as a safe fallback.
const APP_STORE_URL = "https://apps.apple.com/gb/developer/scene/id";

interface AppStoreButtonProps {
  className?: string;
}

export default function AppStoreButton({ className = "" }: AppStoreButtonProps) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
      className={`inline-flex items-center justify-center bg-scene-surface border border-scene-border text-white font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-white/5 active:scale-95 transition-all duration-150 ${className}`}
    >
      Download on the App Store
    </a>
  );
}
