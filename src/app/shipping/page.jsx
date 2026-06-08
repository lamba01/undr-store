export const metadata = {
  title: "Shipping & Delivery | UNDR.",
  description: "Shipping and delivery information for UNDR.",
};

export default function ShippingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-normal tracking-tight mb-2">
        Shipping & Delivery
      </h1>
      <p className="text-neutral-500 text-sm mb-12">
        Everything you need to know about getting your order delivered.
      </p>

      {/* Delivery Options */}
      <div className="mb-12">
        <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-6">
          Delivery Options
        </h2>
        <div className="space-y-4">
          <div className="border border-neutral-200 p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium">
                Standard Nationwide Delivery
              </h3>
              <span className="text-sm text-black">₦3,000</span>
            </div>
            <p className="text-xs text-neutral-500 mb-2">
              Delivered within 3 business days across Nigeria.
            </p>
            <p className="text-xs text-green-600">
              Free on orders over ₦50,000
            </p>
          </div>

          <div className="border border-neutral-200 p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium">Lagos Same Day Delivery</h3>
              <span className="text-sm text-black">₦2,000</span>
            </div>
            <p className="text-xs text-neutral-500">
              Available for orders placed before 12PM within Lagos. Delivered
              same day.
            </p>
          </div>

          <div className="border border-neutral-200 p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium">Store Pickup</h3>
              <span className="text-sm text-green-600">Free</span>
            </div>
            <p className="text-xs text-neutral-500">
              Pick up your order from our Lagos location. Available by
              appointment.
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Timeframes */}
      <div className="mb-12">
        <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-6">
          Delivery Timeframes
        </h2>
        <div className="space-y-3">
          {[
            { location: "Lagos", time: "1 – 2 business days" },
            { location: "Abuja, Port Harcourt", time: "2 – 3 business days" },
            { location: "Other states", time: "3 – 5 business days" },
          ].map((item) => (
            <div
              key={item.location}
              className="flex justify-between py-3 border-b border-neutral-100 text-sm"
            >
              <span className="text-neutral-600">{item.location}</span>
              <span className="text-black">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="mb-12">
        <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-6">
          Important Notes
        </h2>
        <ul className="space-y-3">
          {[
            "Orders are processed within 24 hours of payment confirmation.",
            "Delivery timeframes are estimates and may vary during peak periods or public holidays.",
            "You will receive a WhatsApp notification once your order has been dispatched.",
            "Ensure your delivery address and phone number are correct at checkout.",
            "UNDR. is not responsible for delays caused by incorrect delivery information.",
          ].map((note, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-neutral-600"
            >
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 shrink-0" />
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="bg-neutral-50 p-6">
        <p className="text-sm text-neutral-600 mb-3">
          Have questions about your delivery? We&apos;re here to help.
        </p>
        <a
          href="https://wa.me/234XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors"
        >
          Chat on WhatsApp
        </a>
      </div>
    </main>
  );
}
