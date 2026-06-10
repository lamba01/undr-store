export const metadata = {
  title: "Contact Us | UNDR.",
  description: "Get in touch with UNDR.",
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-normal tracking-tight mb-2">Contact Us</h1>
      <p className="text-neutral-500 text-sm mb-12">
        We&apos;d love to hear from you. Reach out via any of the channels
        below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* WhatsApp */}
        <a
          href="https://wa.me/2347046038021"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-neutral-200 p-6 hover:border-black transition-colors group"
        >
          <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium tracking-widest uppercase mb-1">
            WhatsApp
          </h3>
          <p className="text-xs text-neutral-500">Chat with us directly</p>
          <p className="text-xs text-black mt-2 group-hover:underline">
            +234 704 603 8021
          </p>
        </a>

        {/* TikTok */}
        <a
          href="https://tiktok.com/@undr.ng"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-neutral-200 p-6 hover:border-black transition-colors group"
        >
          <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium tracking-widest uppercase mb-1">
            TikTok
          </h3>
          <p className="text-xs text-neutral-500">Watch our latest content</p>
          <p className="text-xs text-black mt-2 group-hover:underline">
            @undr.ng
          </p>
        </a>

        {/* Snapchat */}
        <a
          href="https://snapchat.com/add/undr.ng"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-neutral-200 p-6 hover:border-black transition-colors group"
        >
          <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12.065 2c1.59.006 4.804.434 6.034 3.567.39.977.3 2.644.21 3.937-.017.24-.033.469-.044.685.127.065.293.13.49.13.34 0 .668-.148.957-.44a.494.494 0 01.656-.039c.228.174.32.463.225.72-.266.726-1.045 1.234-2.015 1.373-.007.033-.012.067-.02.1.018.057.06.178.163.362.41.733 1.275 1.617 2.79 2.122a.499.499 0 01.337.497c-.006.075-.071.748-.923 1.25-.394.232-.87.39-1.415.472-.097.015-.195.032-.296.05-.163.03-.332.062-.52.104-.232.053-.408.224-.497.483-.066.192-.209.612-.756.612a1.63 1.63 0 01-.568-.118c-.437-.155-.895-.234-1.363-.234-.3 0-.594.034-.876.1-.517.125-1.003.425-1.511.738-.673.413-1.37.841-2.307.841-.037 0-.073-.001-.11-.003h-.085c-.936 0-1.634-.428-2.306-.84-.509-.314-.995-.614-1.512-.74a4.697 4.697 0 00-.875-.099c-.468 0-.926.079-1.363.234a1.63 1.63 0 01-.568.118c-.547 0-.69-.42-.757-.614-.088-.257-.263-.428-.494-.48-.19-.043-.36-.075-.524-.105a7.203 7.203 0 00-.295-.05c-.545-.081-1.02-.239-1.415-.471-.852-.502-.917-1.175-.923-1.25a.499.499 0 01.337-.497c1.516-.505 2.381-1.39 2.79-2.122.104-.185.145-.305.164-.363a2.915 2.915 0 00-.02-.099c-.97-.139-1.748-.647-2.015-1.373a.497.497 0 01.225-.72.495.495 0 01.656.038c.29.293.618.441.957.441.198 0 .364-.065.492-.13-.011-.216-.027-.445-.044-.685-.09-1.293-.18-2.96.21-3.937C7.131 2.434 10.345 2.006 11.935 2h.13z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium tracking-widest uppercase mb-1">
            Snapchat
          </h3>
          <p className="text-xs text-neutral-500">Add us on Snapchat</p>
          <p className="text-xs text-black mt-2 group-hover:underline">
            @undr.ng
          </p>
        </a>

        {/* Location */}
        <div className="border border-neutral-200 p-6">
          <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="text-sm font-medium tracking-widest uppercase mb-1">
            Location
          </h3>
          <p className="text-xs text-neutral-500 mb-2">
            D&apos;Agora 6, Bisola Durosimi Etti
            <br />
            Lekki Phase 1, Lagos
          </p>
          <a
            href="https://maps.google.com/?q=D'Agora+6+Bisola+Durosimi+Etti+Lekki+Phase+1+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-black underline hover:text-neutral-600 transition-colors"
          >
            View on Google Maps →
          </a>
        </div>
      </div>

      {/* Business Hours */}
      <div className="border-t border-neutral-100 pt-8">
        <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-6">
          Business Hours
        </h2>
        <div className="space-y-3">
          {[
            { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
            { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
            { day: "Sunday", hours: "Closed" },
          ].map((item) => (
            <div key={item.day} className="flex justify-between text-sm">
              <span className="text-neutral-500">{item.day}</span>
              <span
                className={
                  item.hours === "Closed" ? "text-neutral-400" : "text-black"
                }
              >
                {item.hours}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
