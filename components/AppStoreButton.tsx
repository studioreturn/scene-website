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
      className={`inline-flex items-center gap-3 bg-scene-accent text-black font-semibold text-sm px-5 py-3 rounded-full hover:opacity-90 active:scale-95 transition-all duration-150 ${className}`}
    >
      {/* Apple logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 814 1000"
        className="w-5 h-5 fill-current flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-172.5-137.8C46.4 724.1 1 577 1 430.1c0-226.6 148.3-346.7 294.3-346.7 74.2 0 136.1 49.3 183.5 49.3 45.3 0 116.3-52.5 201.8-52.5 32.5 0 118.3 2.9 184 76.3zm-224.8-98.1c33.5-39.5 57.2-94.3 57.2-149.1 0-7.6-.6-15.2-1.9-21.5-54.4 1.9-118.3 36.2-157.6 80.8-30.8 35.5-59.5 90.3-59.5 146.5 0 8.3 1.3 16.5 1.9 19.1 3.2.6 8.3 1.3 13.5 1.3 48.7 0 109.5-32.8 146.4-76.1z" />
      </svg>
      Download on the App Store
    </a>
  );
}
