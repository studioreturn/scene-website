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
      className={`inline-flex items-center justify-center gap-2 bg-white text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-150 ${className}`}
    >
      Open in Scene
    </a>
  );
}
