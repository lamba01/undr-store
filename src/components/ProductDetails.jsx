"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const hasVariants =
    product?.enableVariants && product?.variantTypes?.length > 0;
  const variantTypes = product?.variantTypes || [];
  const variants =
    product?.variants?.docs?.filter((v) => v._status === "published") || [];

  // Find matching variant based on selected options
  const selectedVariant = variants.find((variant) => {
    const optionIds = variant.options?.map((o) => o.id) || [];
    const selectedIds = Object.values(selectedOptions);
    return (
      selectedIds.length === variantTypes.length &&
      selectedIds.every((id) => optionIds.includes(id))
    );
  });

  // Check if a specific option is available (has stock)
  const isOptionAvailable = (typeId, optionId) => {
    const otherSelections = Object.entries(selectedOptions)
      .filter(([tId]) => Number(tId) !== typeId)
      .map(([, oId]) => oId);

    return variants.some((variant) => {
      if (variant._status !== "published") return false;
      if (variant.inventory <= 0) return false;
      const optionIds = variant.options?.map((o) => o.id) || [];
      return (
        optionIds.includes(optionId) &&
        otherSelections.every((id) => optionIds.includes(id))
      );
    });
  };

  //   const handleOptionSelect = (typeId, optionId) => {
  //     setSelectedOptions((prev) => ({ ...prev, [typeId]: optionId }));
  //   };
  const handleOptionSelect = (typeId, optionId) => {
    setSelectedOptions((prev) => {
      if (prev[typeId] === optionId) {
        const updated = { ...prev };
        delete updated[typeId];
        return updated;
      }
      return { ...prev, [typeId]: optionId };
    });
  };

  //   const handleAddToCart = () => {
  //     if (hasVariants && !selectedVariant) return;
  //     setAdded(true);
  //     setTimeout(() => setAdded(false), 2000);
  //   };
  const handleAddToCart = () => {
    if (hasVariants && !selectedVariant) return;
    if (outOfStock) return;
      console.log("Adding to cart:", {
    productId: product.id,
    variantId: selectedVariant?.id,
    key: selectedVariant ? `${product.id}-${selectedVariant.id}` : `${product.id}`
  })

    addToCart(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const allOptionsSelected =
    Object.keys(selectedOptions).length === variantTypes.length;
  const outOfStock = hasVariants
    ? selectedVariant
      ? selectedVariant.inventory <= 0
      : false
    : product.inventory <= 0;

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Category */}
      {product?.categories?.length > 0 && (
        <p className="text-xs tracking-[0.2em] uppercase text-neutral-400">
          {product.categories.map((c) => c.title).join(", ")}
        </p>
      )}

      {/* Title */}
      <h1 className="text-3xl font-normal tracking-tight">{product.title}</h1>

      {/* Price */}
      <p className="text-xl text-black">
        ₦{product.priceInNGN?.toLocaleString()}
      </p>

      {/* Stock indicator */}
      {selectedVariant && (
        <p
          className={`text-xs tracking-widest uppercase ${selectedVariant.inventory <= 0 ? "text-red-400" : "text-green-600"}`}
        >
          {selectedVariant.inventory <= 0
            ? "Out of Stock"
            : `${selectedVariant.inventory} in stock`}
        </p>
      )}

      <div className="w-12 h-px bg-neutral-200" />

      {/* Description */}
      {product?.description && (
        <div className="text-sm text-neutral-600 leading-relaxed">
          {product.description?.root?.children?.map((block, i) => (
            <p key={i}>
              {block?.children?.map((child) => child.text).join("")}
            </p>
          ))}
        </div>
      )}

      {/* Variant Selectors */}
      {hasVariants &&
        variantTypes.map((variantType) => (
          <div key={variantType.id}>
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-3">
              {variantType.label}
              {selectedOptions[variantType.id] && (
                <span className="ml-2 text-black normal-case tracking-normal">
                  —{" "}
                  {
                    variantType.options?.docs?.find(
                      (o) => o.id === selectedOptions[variantType.id],
                    )?.label
                  }
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {variantType.options?.docs?.map((option) => {
                const available = isOptionAvailable(variantType.id, option.id);
                const selected = selectedOptions[variantType.id] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      available && handleOptionSelect(variantType.id, option.id)
                    }
                    disabled={!available}
                    className={`px-4 py-2 cursor-pointer text-xs tracking-widest uppercase border transition-colors relative ${
                      selected
                        ? "border-black bg-black text-white"
                        : available
                          ? "border-neutral-200 text-neutral-600 hover:border-black"
                          : "border-neutral-100 text-neutral-300 cursor-not-allowed line-through"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      {/* Quantity */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-3">
          Quantity
        </p>
        <div className="flex items-center border border-neutral-200 w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center cursor-pointer text-neutral-600 hover:text-black transition-colors"
          >
            −
          </button>
          <span className="w-10 h-10 flex items-center justify-center text-sm border-x border-neutral-200">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center cursor-pointer text-neutral-600 hover:text-black transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={outOfStock || (hasVariants && !allOptionsSelected)}
          className={`flex-1 py-4 cursor-pointer text-xs tracking-widest uppercase transition-colors ${
            outOfStock
              ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              : added
                ? "bg-neutral-800 text-white"
                : hasVariants && !allOptionsSelected
                  ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-neutral-800"
          }`}
        >
          {outOfStock
            ? "Out of Stock"
            : added
              ? "Added to Cart ✓"
              : hasVariants && !allOptionsSelected
                ? "Select Options"
                : "Add to Cart"}
        </button>
        <button className="w-12 h-12 flex items-center justify-center border border-neutral-200 hover:border-black transition-colors">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Helper text */}
      {hasVariants && !allOptionsSelected && !outOfStock && (
        <p className="text-xs text-neutral-400">
          Please select{" "}
          {variantTypes
            .filter((t) => !selectedOptions[t.id])
            .map((t) => t.label)
            .join(" and ")}{" "}
          to continue
        </p>
      )}

      {/* Delivery Info */}
      <div className="border-t border-neutral-100 pt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Free delivery on orders over ₦50,000
        </div>
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Delivered across Nigeria
        </div>
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Easy returns within 7 days
        </div>
      </div>
    </div>
  );
}
