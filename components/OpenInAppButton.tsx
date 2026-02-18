"use client";

// TODO: Replace APP_STORE_URL with the real App Store link once the app is live.
const APP_STORE_URL = "https://apps.apple.com/gb/developer/scene/id";

interface OpenInAppButtonProps {
  username: string;
  className?: string;
}

/**
 * Attempts to open the Scene app via its custom URL scheme (scene://user/{username}).
 * If the app is not installed, the scheme call silently fails and after a short
 * delay we fall back to the App Store so the user can download it.
 *
 * Universal Links (https://ourscene.uk/{username}) handle the open-from-outside-Safari
 * case (Messages, Notes, etc.) — this button handles the in-browser case.
 */
export default function OpenInAppButton({
  username,
  className = "",
}: OpenInAppButtonProps) {
  const deepLink = `scene://user/${username}`;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    // Try to open the app via the custom URL scheme.
    window.location.href = deepLink;

    // If the app is not installed the scheme will fail silently and the page
    // will remain visible. After 1.5 s we redirect to the App Store as fallback.
    // The timeout is cleared if the page hides (user switched to the app).
    const timeout = setTimeout(() => {
      window.location.href = APP_STORE_URL;
    }, 1500);

    const clearOnHide = () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", clearOnHide);
    };
    document.addEventListener("visibilitychange", clearOnHide);
  }

  return (
    <a
      href={deepLink}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 bg-scene-accent text-black font-semibold text-sm px-6 py-3.5 rounded-full hover:opacity-90 active:scale-95 transition-all duration-150 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 814 1000"
        className="w-4 h-4 fill-current flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-172.5-137.8C46.4 724.1 1 577 1 430.1c0-226.6 148.3-346.7 294.3-346.7 74.2 0 136.1 49.3 183.5 49.3 45.3 0 116.3-52.5 201.8-52.5 32.5 0 118.3 2.9 184 76.3zm-224.8-98.1c33.5-39.5 57.2-94.3 57.2-149.1 0-7.6-.6-15.2-1.9-21.5-54.4 1.9-118.3 36.2-157.6 80.8-30.8 35.5-59.5 90.3-59.5 146.5 0 8.3 1.3 16.5 1.9 19.1 3.2.6 8.3 1.3 13.5 1.3 48.7 0 109.5-32.8 146.4-76.1z" />
      </svg>
      Open in Scene
    </a>
  );
}
