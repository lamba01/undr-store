import Link from "next/link";
import Image from "next/image";

const categories = [
  { title: "Men", slug: "men" },
  { title: "Lingerie", slug: "lingerie" },
  { title: "Loungewear", slug: "loungewear" },
  { title: "Chemise", slug: "chemise" },
  { title: "Games", slug: "games" },
  { title: "Essentials", slug: "essentials" },
  { title: "Toys", slug: "toys" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <Image
            src="/images/logo.png"
            alt="UNDR."
            width={120}
            height={40}
            //   style={{ width: "auto", height: "40px" }}
            className="object-contain mb-0 pb-0"
          />
          <p className="text-sm text-neutral-400 leading-relaxed mb-6">
            What lies <strong>UNDR</strong>
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://snapchat.com/add/undr.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Snapchat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12.065 2c1.59.006 4.804.434 6.034 3.567.39.977.3 2.644.21 3.937-.017.24-.033.469-.044.685.127.065.293.13.49.13.34 0 .668-.148.957-.44a.494.494 0 01.656-.039c.228.174.32.463.225.72-.266.726-1.045 1.234-2.015 1.373-.007.033-.012.067-.02.1.018.057.06.178.163.362.41.733 1.275 1.617 2.79 2.122a.499.499 0 01.337.497c-.006.075-.071.748-.923 1.25-.394.232-.87.39-1.415.472-.097.015-.195.032-.296.05-.163.03-.332.062-.52.104-.232.053-.408.224-.497.483-.066.192-.209.612-.756.612a1.63 1.63 0 01-.568-.118c-.437-.155-.895-.234-1.363-.234-.3 0-.594.034-.876.1-.517.125-1.003.425-1.511.738-.673.413-1.37.841-2.307.841-.037 0-.073-.001-.11-.003h-.085c-.936 0-1.634-.428-2.306-.84-.509-.314-.995-.614-1.512-.74a4.697 4.697 0 00-.875-.099c-.468 0-.926.079-1.363.234a1.63 1.63 0 01-.568.118c-.547 0-.69-.42-.757-.614-.088-.257-.263-.428-.494-.48-.19-.043-.36-.075-.524-.105a7.203 7.203 0 00-.295-.05c-.545-.081-1.02-.239-1.415-.471-.852-.502-.917-1.175-.923-1.25a.499.499 0 01.337-.497c1.516-.505 2.381-1.39 2.79-2.122.104-.185.145-.305.164-.363a2.915 2.915 0 00-.02-.099c-.97-.139-1.748-.647-2.015-1.373a.497.497 0 01.225-.72.495.495 0 01.656.038c.29.293.618.441.957.441.198 0 .364-.065.492-.13-.011-.216-.027-.445-.044-.685-.09-1.293-.18-2.96.21-3.937C7.131 2.434 10.345 2.006 11.935 2h.13z" />
              </svg>
            </a>
            <a
              href="https://tiktok.com/@undr.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
              </svg>
            </a>
            <a
              href="https://wa.me/2347046038021"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-5">
            Shop
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/store"
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                All Products
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/store?category=${cat.slug}`}
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-5">
            Help
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/shipping"
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-5">
            Contact
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="mt-0.5 shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +234 704 603 8021
            </li>
            {/* <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="mt-0.5 shrink-0"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              hello@undr.com
            </li> */}
            <li className="flex items-start gap-2 text-sm text-neutral-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="mt-0.5 shrink-0"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lagos, Nigeria
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} UNDR. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-neutral-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-neutral-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
