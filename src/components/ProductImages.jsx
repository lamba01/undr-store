"use client";

import { useState } from "react";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

export default function ProductImages({ gallery = [], title }) {
  const [active, setActive] = useState(0);

  const images = gallery?.filter((g) => g?.image?.url) || [];

  if (images.length === 0) {
    return (
      <div className="aspect-3/4 bg-neutral-100 flex items-center justify-center">
        <span className="text-neutral-400 text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-16 shrink-0">
          {images.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden border-2 transition-colors ${
                active === i ? "border-black" : "border-transparent"
              }`}
            >
              <img
                src={`${PAYLOAD_URL}${item.image.url}`}
                alt={`${title} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 aspect-[3/4] overflow-hidden bg-neutral-100 relative">
        <img
          src={`${PAYLOAD_URL}${images[active].image.url}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
