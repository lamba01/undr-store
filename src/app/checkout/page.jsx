"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [paymentFailed, setPaymentFailed] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deliveryType: "delivery",
    address: "",
    city: "",
    state: "",
  });

  const deliveryFee =
    form.deliveryType === "pickup" ? 0 : cartTotal >= 50000 ? 0 : 3000;
  const orderTotal = cartTotal + deliveryFee;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //   const handlePaystack = () => {
  //     if (!form.firstName || !form.lastName || !form.email || !form.phone) {
  //       alert("Please fill in all required fields");
  //       return;
  //     }
  //     if (
  //       form.deliveryType === "delivery" &&
  //       (!form.address || !form.city || !form.state)
  //     ) {
  //       alert("Please fill in your delivery address");
  //       return;
  //     }
  //     // ref: (`UNDR-${Date.now()}`);
  //     setLoading(true);

  //     const handler = window.PaystackPop.setup({
  //       key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  //       email: form.email,
  //       amount: orderTotal * 100, // Paystack uses kobo
  //       currency: "NGN",

  //       metadata: {
  //         custom_fields: [
  //           {
  //             display_name: "Customer Name",
  //             value: `${form.firstName} ${form.lastName}`,
  //           },
  //           { display_name: "Phone", value: form.phone },
  //           { display_name: "Delivery Type", value: form.deliveryType },
  //           { display_name: "Address", value: form.address || "Store Pickup" },
  //         ],
  //       },
  //       callback: async (response) => {
  //         // Payment successful - save order to Payload
  //         await saveOrder(response.reference);
  //       },
  //       onClose: () => {
  //         setLoading(false);
  //       },
  //     });

  //     handler.openIframe();
  //   };

  //   const saveOrder = async (reference) => {
  //     try {
  //       const orderData = {
  //         reference,
  //         customer: {
  //           firstName: form.firstName,
  //           lastName: form.lastName,
  //           email: form.email,
  //           phone: form.phone,
  //         },
  //         delivery: {
  //           type: form.deliveryType,
  //           address: form.address,
  //           city: form.city,
  //           state: form.state,
  //         },
  //         items: cart.map((item) => ({
  //           productId: item.productId,
  //           title: item.title,
  //           variant: item.variant?.title || "N/A",
  //           quantity: item.quantity,
  //           price: item.price,
  //           subtotal: item.price * item.quantity,
  //         })),
  //         subtotal: cartTotal,
  //         deliveryFee,
  //         total: orderTotal,
  //         status: "confirmed",
  //       };

  //       const res = await fetch(`${PAYLOAD_URL}/api/shop-orders`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(orderData),
  //       });
  //       const data = await res.json();
  //       console.log("Order save response:", res.status, data);

  //       if (res.ok) {
  //         clearCart();
  //         router.push(`/order-confirmation?ref=${reference}`);
  //       }
  //     } catch (err) {
  //       console.error("Failed to save order", err);
  //       // Still redirect even if order save fails
  //       clearCart();
  //       router.push(`/order-confirmation?ref=${reference}`);
  //     }
  //   };

  const handlePaystack = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      alert("Please fill in all required fields");
      return;
    }
    if (
      form.deliveryType === "delivery" &&
      (!form.address || !form.city || !form.state)
    ) {
      alert("Please fill in your delivery address");
      return;
    }

    if (!window.PaystackPop) {
      alert("Payment system still loading, please try again");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: orderTotal * 100,
      currency: "NGN",
      ref: `UNDR-${Math.floor(Math.random() * 1000000000)}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: `${form.firstName} ${form.lastName}`,
          },
          { display_name: "Phone", variable_name: "phone", value: form.phone },
          {
            display_name: "Delivery Type",
            variable_name: "delivery_type",
            value: form.deliveryType,
          },
          {
            display_name: "Address",
            variable_name: "address",
            value: form.address || "Store Pickup",
          },
        ],
      },
      callback: function (response) {
        console.log("Payment callback fired!", response);
        saveOrder(response.reference);
      },
      onClose: function () {
        console.log("Payment closed");
        setLoading(false);
        setPaymentFailed(true);
        setTimeout(() => setPaymentFailed(false), 4000);
      },
    });

    handler.openIframe();
  };
  const saveOrder = async (reference) => {
    console.log("saveOrder called with ref:", reference);
    console.log("cart at save time:", cart);

    try {
      const orderData = {
        reference,
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
        },
        delivery: {
          type: form.deliveryType,
          address: form.address,
          city: form.city,
          state: form.state,
        },
        items: cart.map((item) => ({
          productId: item.productId,
          title: item.title,
          variant: item.variant?.title || "N/A",
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
        subtotal: cartTotal,
        deliveryFee,
        total: orderTotal,
        status: "confirmed",
      };

      console.log("Sending order data:", orderData);

      const res = await fetch(`${PAYLOAD_URL}/api/shop-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      console.log("Response status:", res.status);
      console.log("Response data:", data);

      clearCart();
      router.push(`/order-confirmation?ref=${reference}`);
    } catch (err) {
      console.error("saveOrder error:", err);
      clearCart();
      router.push(`/order-confirmation?ref=${reference}`);
    }
  };
  if (cart.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-normal mb-4">Your cart is empty</h1>
        <Link
          href="/store"
          className="text-xs tracking-widest uppercase underline"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <>
      {/* Paystack inline script */}
      <script src="https://js.paystack.co/v1/inline.js" async />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-normal tracking-tight mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Form */}
          <div className="flex flex-col gap-8">
            {/* Contact */}
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-5">
                Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
                    First Name *
                  </label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
                    Last Name *
                  </label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                    placeholder="john@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
                    Phone *
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                    placeholder="08012345678"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Type */}
            <div>
              <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-5">
                Delivery Option
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() =>
                    setForm((p) => ({ ...p, deliveryType: "delivery" }))
                  }
                  className={`border p-4 text-left transition-colors ${
                    form.deliveryType === "delivery"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 hover:border-black"
                  }`}
                >
                  <p className="text-xs tracking-widest uppercase font-medium mb-1">
                    Home Delivery
                  </p>
                  <p
                    className={`text-xs ${form.deliveryType === "delivery" ? "text-neutral-300" : "text-neutral-500"}`}
                  >
                    {cartTotal >= 50000 ? "Free" : "₦3,000"}
                  </p>
                </button>
                <button
                  onClick={() =>
                    setForm((p) => ({ ...p, deliveryType: "pickup" }))
                  }
                  className={`border p-4 text-left transition-colors ${
                    form.deliveryType === "pickup"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 hover:border-black"
                  }`}
                >
                  <p className="text-xs tracking-widest uppercase font-medium mb-1">
                    Store Pickup
                  </p>
                  <p
                    className={`text-xs ${form.deliveryType === "pickup" ? "text-neutral-300" : "text-neutral-500"}`}
                  >
                    Free
                  </p>
                </button>
              </div>
            </div>

            {/* Delivery Address */}
            {form.deliveryType === "delivery" && (
              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-5">
                  Delivery Address
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
                      Address *
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full border border-neutral-200 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                      placeholder="12 Adeola Odeku Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
                        City *
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full border border-neutral-200 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                        placeholder="Lagos"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase text-neutral-500 block mb-2">
                        State *
                      </label>
                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full border border-neutral-200 px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                        placeholder="Lagos"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right - Order Summary */}
          <div>
            <div className="bg-neutral-50 p-6 sticky top-24">
              <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-4 mb-6">
                {cart.map((item) => (
                  <div key={item.key} className="flex gap-3">
                    <div className="w-14 h-18 bg-neutral-100 shrink-0 overflow-hidden">
                      {item.image && (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">{item.title}</p>
                      {item.variant?.options?.length > 0 && (
                        <p className="text-xs text-neutral-400">
                          {item.variant.options.map((o) => o.label).join(" / ")}
                        </p>
                      )}
                      <p className="text-xs text-neutral-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-xs font-medium shrink-0">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-neutral-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span>₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Delivery</span>
                  <span>
                    {deliveryFee === 0
                      ? "Free"
                      : `₦${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium border-t border-neutral-200 pt-3">
                  <span>Total</span>
                  <span>₦{orderTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePaystack}
                disabled={loading}
                className={`w-full mt-6 py-4 text-xs cursor-pointer tracking-widest uppercase transition-colors ${
                  loading
                    ? "bg-neutral-400 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-neutral-800"
                }`}
              >
                {loading
                  ? "Processing..."
                  : `Pay ₦${orderTotal.toLocaleString()}`}
              </button>

              {paymentFailed && (
                <p className="text-xs text-red-400 text-center mt-2">
                  Payment was not completed. Please try again.
                </p>
              )}

              <p className="text-xs text-neutral-400 text-center mt-3">
                Secured by Paystack 🔒
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
