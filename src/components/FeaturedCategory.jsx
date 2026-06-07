import Link from "next/link";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;
import Image from "next/image";

export default function FeaturedCategory({
  products = [],
  title,
  description,
  slug,
  label,
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left - Text side */}
        <div className="bg-black text-white flex flex-col justify-center text-center sm:text-start px-5 py-5 sm:px-12 sm:py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">
            Featured Collection
          </p>
          <h2 className="text-4xl font-normal leading-tight mb-4 tracking-tight">
            Dressed for
            <br />
            <em className="italic text-neutral-300">every occasion</em>
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed mb-8 max-w-xs">
            {description}
          </p>
          <Link
            href={`/store?category=${slug}`}
            className="inline-flex items-center justify-center w-full sm:w-fit gap-2 bg-white text-center text-black sm:px-12 py-4 text-xs tracking-widest uppercase hover:bg-neutral-200 transition-colors"
          >
            {label}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Right - Products grid */}
        <div className="grid grid-cols-2 gap-0.5 bg-neutral-100">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.slug}`}
              className="group relative aspect-square overflow-hidden bg-neutral-200"
            >
              {product?.gallery?.[0]?.image?.url ? (
                <Image
                  src={`${PAYLOAD_URL}${product.gallery[0].image.url}`}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs tracking-widest uppercase">
                  {product.title}
                </p>
                <p className="text-white/80 text-xs">
                  ₦{product.priceInNGN?.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
