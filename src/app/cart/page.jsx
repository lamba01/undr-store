"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-300 mb-6"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <h1 className="text-2xl font-normal tracking-tight mb-3">
          Your cart is empty
        </h1>
        <p className="text-sm text-neutral-500 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/store"
          className="bg-black text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors"
        >
          Shop Now
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-normal tracking-tight mb-10">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.key}
              className="flex gap-4 pb-6 border-b border-neutral-100"
            >
              {/* Image */}
              <Link href={`/store/${item.slug}`} className="shrink-0">
                <div className="w-24 h-32 bg-neutral-100 overflow-hidden">
                  {item.image ? (
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100" />
                  )}
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/store/${item.slug}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {item.title}
                      </Link>
                      {/* Variant options */}
                      {item.variant?.options?.length > 0 && (
                        <p className="text-xs text-neutral-500 mt-1">
                          {item.variant.options.map((o) => o.label).join(" / ")}
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-medium shrink-0">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    ₦{item.price.toLocaleString()} each
                  </p>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-neutral-200 w-fit">
                    <button
                      onClick={() =>
                        updateQuantity(item.key, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center cursor-pointer text-neutral-600 hover:text-black transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-sm border-x border-neutral-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.key, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center cursor-pointer text-neutral-600 hover:text-black transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.key)}
                    className="text-xs tracking-widest uppercase cursor-pointer text-neutral-400 hover:text-black transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 p-6 sticky top-24">
            <h2 className="text-sm tracking-[0.2em] uppercase text-neutral-500 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Delivery</span>
                <span className="text-neutral-500">Calculated at checkout</span>
              </div>
              {cartTotal >= 50000 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Free delivery applied</span>
                  <span>−₦0</span>
                </div>
              )}
            </div>

            <div className="border-t border-neutral-200 pt-4 mb-6">
              <div className="flex justify-between text-sm font-medium">
                <span>Total</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-center py-4 text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/store"
              className="block w-full text-center py-3 text-xs tracking-widest uppercase text-neutral-500 hover:text-black transition-colors mt-3"
            >
              Continue Shopping
            </Link>

            {/* Trust badges */}
            <div className="border-t border-neutral-100 mt-6 pt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Secure checkout via Paystack
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <svg
                  width="14"
                  height="14"
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
        </div>
      </div>
    </main>
  );
}
