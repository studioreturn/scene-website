"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/jKXRVhSz";

function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);
}

export default function JoinBetaButton({ className }: { className?: string }) {
  const [showModal, setShowModal] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobileDevice());
  }, []);

  const handleClick = useCallback(() => {
    if (mobile) {
      window.open(TESTFLIGHT_URL, "_blank", "noopener,noreferrer");
    } else {
      setShowModal(true);
    }
  }, [mobile]);

  const closeModal = useCallback(() => setShowModal(false), []);

  useEffect(() => {
    if (!showModal) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal, closeModal]);

  return (
    <>
      <button
        onClick={handleClick}
        className={className}
        type="button"
      >
        Join the beta
      </button>

      {showModal && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative z-10 flex flex-col items-center gap-5 rounded-2xl p-7 max-w-xs w-full"
            style={{ background: "#111111", border: "1px solid #1a1a1a" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-scene-muted hover:text-white transition-colors"
              style={{ background: "#1c1c1e", border: "1px solid #2c2c2e" }}
              aria-label="Close"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* QR code */}
            <div className="rounded-xl p-3 mt-2" style={{ background: "#ffffff" }}>
              <QRCodeSVG
                value={TESTFLIGHT_URL}
                size={160}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            </div>

            <p className="text-white text-sm font-medium text-center">
              Scan the QR code to sign up,<br />or visit <a href="/beta" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">ourscene.uk/beta</a>.
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
