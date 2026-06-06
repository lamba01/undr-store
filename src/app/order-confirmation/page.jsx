"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function OrderConfirmation() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <main className="max-w-2xl mx-auto px-6 py-20 text-center">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="text-3xl font-normal tracking-tight mb-3">
        Order Confirmed!
      </h1>
      <p className="text-neutral-500 mb-2">Thank you for shopping with UNDR.</p>
      {ref && (
        <p className="text-sm text-neutral-400 mb-8">
          Order reference: <span className="text-black font-medium">{ref}</span>
        </p>
      )}

      <div className="bg-neutral-50 p-6 text-left mb-8">
        <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4">
          What happens next?
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-neutral-600">
            <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
              1
            </span>
            You&apos;ll receive an order confirmation email shortly
          </li>
          <li className="flex items-start gap-3 text-sm text-neutral-600">
            <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
              2
            </span>
            Your order will be processed and packed
          </li>
          <li className="flex items-start gap-3 text-sm text-neutral-600">
            <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
              3
            </span>
            You&apos;ll be notified when your order is on its way
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/store"
          className="bg-black text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="border border-neutral-200 px-10 py-4 text-xs tracking-widest uppercase hover:border-black transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-neutral-400">Loading...</div>
      }
    >
      <OrderConfirmation />
    </Suspense>
  );
}
