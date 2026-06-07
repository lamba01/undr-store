"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MobileFilters({
  categories,
  currentCategory,
  currentSort,
  currentSearch,
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const applyFilter = (type, value) => {
    const params = new URLSearchParams();
    if (currentSearch) params.set("q", currentSearch);

    if (type === "category") {
      if (value) params.set("category", value);
      if (currentSort) params.set("sort", currentSort);
    } else if (type === "sort") {
      if (currentCategory) params.set("category", currentCategory);
      if (value) params.set("sort", value);
    }

    router.push(`/store?${params.toString()}`);
    setOpen(false);
  };

  return (
    <>
      {/* Filter Button - Mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 border border-neutral-200 px-4 py-2 text-xs tracking-widest uppercase hover:border-black transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <line x1="12" y1="18" x2="20" y2="18" />
        </svg>
        Filter & Sort
        {(currentCategory || currentSort) && (
          <span className="w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
            {[currentCategory, currentSort].filter(Boolean).length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white z-50 lg:hidden transition-transform duration-300 rounded-t-2xl ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-neutral-200 rounded-full" />
        </div>

        <div className="px-6 pb-8 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-widest uppercase">
              Filter & Sort
            </h2>
            <button onClick={() => setOpen(false)}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyFilter("category", "")}
                className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                  !currentCategory
                    ? "bg-black text-white border-black"
                    : "border-neutral-200 text-neutral-600 hover:border-black"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => applyFilter("category", cat.slug)}
                  className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                    currentCategory === cat.slug
                      ? "bg-black text-white border-black"
                      : "border-neutral-200 text-neutral-600 hover:border-black"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-8">
            <h3 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">
              Sort By
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Newest", value: "-createdAt" },
                { label: "Oldest", value: "createdAt" },
                { label: "Price: Low to High", value: "priceInNGN" },
                { label: "Price: High to Low", value: "-priceInNGN" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => applyFilter("sort", option.value)}
                  className={`flex items-center justify-between px-4 py-3 text-sm border transition-colors ${
                    currentSort === option.value
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-black"
                  }`}
                >
                  {option.label}
                  {currentSort === option.value && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {(currentCategory || currentSort) && (
            <button
              onClick={() => {
                router.push("/store");
                setOpen(false);
              }}
              className="w-full py-3 text-xs tracking-widest uppercase text-neutral-500 border border-neutral-200 hover:border-black transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </>
  );
}
