"use client";

import { useEffect, useId } from "react";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, onClose, children }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <div
        className="fade-in absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fade-in relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-line-strong bg-[#131110] shadow-[0_50px_140px_-30px_rgba(0,0,0,0.95)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(80%_100%_at_30%_0%,rgba(224,138,104,0.12),transparent_75%)]"
        />

        <div className="relative flex items-start justify-between gap-4 border-b border-line/70 px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <p className="text-[9.5px] font-medium uppercase tracking-[0.18em] text-faint">
              Juragan Aqiqah workspace
            </p>
            <h2
              id={titleId}
              className="mt-1 font-display text-[24px] leading-none tracking-[-0.01em] text-ink"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="icon-btn -mr-1 -mt-1 shrink-0"
          >
            <X size={17} />
          </button>
        </div>

        <div className="relative overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
      </div>
    </div>
  );
}
