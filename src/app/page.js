import Link from "next/link";
import { getProducts, getCategories } from "@/lib/payload";
import Hero from "@/components/hero";
import ProductCard from "@/components/ProductCard";
import FeaturedCategory from "@/components/FeaturedCategory";

export default async function Home() {
  const { docs: products } = await getProducts({ limit: 8 });
  const { docs: menProducts } = await getProducts({
    category: "men",
    limit: 4,
  });
  // const categories = await getCategories();

  const categories = [
    { id: 1, title: "Men", slug: "men", image: "/images/cat-men.jpg" },
    {
      id: 2,
      title: "Lingerie",
      slug: "lingerie",
      image: "/images/cat-lingerie.jpg",
    },
    {
      id: 3,
      title: "Loungewear",
      slug: "loungewear",
      image: "/images/cat-loungewear.jpg",
    },
    {
      id: 4,
      title: "Chemise",
      slug: "chemise",
      image: "/images/cat-chemise.jpg",
    },
    { id: 5, title: "Games", slug: "games", image: "/images/cat-games.jpg" },
    {
      id: 6,
      title: "Essentials",
      slug: "essentials",
      image: "/images/cat-essentials.jpg",
    },
    { id: 7, title: "Toys", slug: "toys", image: "/images/cat-toys.jpg" },
  ];

  return (
    <main>
      <Hero />

      {/* Categories Strip
      <section className="border-y border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8 overflow-x-auto">
          <Link
            href="/store"
            className="text-xs tracking-widest uppercase text-black font-medium whitespace-nowrap"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/store?category=${cat.slug}`}
              className="text-xs tracking-widest uppercase text-neutral-500 hover:text-black transition-colors whitespace-nowrap"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </section> */}
      {/* Shop By Category */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-normal tracking-tight">
            Shop by Category
          </h2>
          <Link
            href="/store"
            className="text-xs tracking-widest uppercase text-neutral-500 hover:text-black transition-colors"
          >
            Shop All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/store?category=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-100"
            >
              {/* Background image */}
              <img
                src={cat.image || "/images/category-placeholder.jpg"}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
              {/* Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-sm tracking-[0.2em] uppercase font-medium">
                  {cat.title}
                </span>
                <span className="mt-2 text-xs tracking-widest uppercase border-b border-white/60 pb-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors"
          >
            Shop All Products
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
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-normal tracking-tight">New Arrivals</h2>
          <Link
            href="/store"
            className="text-xs tracking-widest uppercase text-neutral-500 hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <FeaturedCategory
        products={menProducts}
        title="Men's Collection"
        description="Sharp, clean and effortless. Explore our men's collection built for the modern man."
        slug="men"
        label="Shop Men"
      />
    </main>
  );
}
