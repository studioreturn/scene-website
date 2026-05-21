"use client";

interface OpenInAppButtonProps {
  username: string;
  className?: string;
}

/**
 * Opens the Scene app via its custom URL scheme (scene://user/{username}).
 * If the app is not installed, Safari shows a brief "cannot open" notice and
 * the user can use the Download button below as fallback.
 *
 * Universal Links (https://ourscene.uk/{username}) handle the open-from-outside-
 * Safari case (Messages, Notes, etc.) — this button handles the in-browser case.
 */
export default function OpenInAppButton({
  username,
  className = "",
}: OpenInAppButtonProps) {
  const deepLink = `scene://user/${username}`;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.location.href = deepLink;
  }

  return (
    <a
      href={deepLink}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 bg-white text-black font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-150 ${className}`}
    >
      {/* Scene app icon — inverted (black on white button) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 685 767"
        className="w-4 h-4 flex-shrink-0"
        aria-hidden="true"
        fill="black"
      >
        <path d="M684.847 271.376V80.3079L520.752 0L164.217 173.765V334.565L0 414.727V605.642L328.611 766.296L685 592.232V400.896L552.155 335.91L684.847 271.376ZM356.236 271.376L657.337 124.431V253.951L356.236 400.896V271.376ZM328.607 575.228L191.869 641.86V511.497L328.607 444.716L493.123 364.523V494.196L328.607 574.389V575.228ZM657.364 575.228L356.232 722.05V592.232L520.748 511.503L657.333 444.871L657.364 575.228Z" />
      </svg>
      Open in Scene
    </a>
  );
}
