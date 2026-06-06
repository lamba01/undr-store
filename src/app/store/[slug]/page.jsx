import { getProduct, getProducts } from "@/lib/payload";
import { notFound } from "next/navigation";
import ProductImages from "@/components/ProductImages";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return notFound();

  const { docs: related } = await getProducts({
    category: product?.categories?.[0]?.slug,
    limit: 4,
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Images */}
        <ProductImages gallery={product.gallery} title={product.title} />

        {/* Right - Details */}
        <ProductDetails product={product} />
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-normal tracking-tight mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related
              .filter((p) => p.slug !== slug)
              .slice(0, 4)
              .map((product) => (
                <a
                  key={product.id}
                  href={`/store/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-3">
                    {product?.gallery?.[0]?.image?.url && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${product.gallery[0].image.url}`}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <p className="text-sm text-black">{product.title}</p>
                  <p className="text-sm text-neutral-500">
                    ₦{product.priceInNGN?.toLocaleString()}
                  </p>
                </a>
              ))}
          </div>
        </section>
      )}
    </main>
  );
}
