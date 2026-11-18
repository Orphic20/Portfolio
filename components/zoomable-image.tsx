"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Expand, X } from "lucide-react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
};

export function ZoomableImage({
  src,
  alt,
  sizes,
  priority,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute inset-0 cursor-zoom-in touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
        <span className="sr-only">View full size</span>
        <span
          aria-hidden="true"
          className="bg-background/85 text-foreground absolute right-2.5 bottom-2.5 flex size-9 items-center justify-center rounded-md border shadow-sm"
        >
          <Expand className="size-4" />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-3 sm:p-8"
            onClick={() => setOpen(false)}
          >
            <p id={titleId} className="sr-only">
              {alt}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-background/90 text-foreground absolute top-3 right-3 z-10 flex size-11 items-center justify-center rounded-md border"
              aria-label="Close image"
            >
              <X className="size-5" />
            </button>
            {/* Native img keeps the screenshot's real aspect ratio inside the viewport. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="max-h-[85dvh] max-w-[94vw] rounded-lg object-contain"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
