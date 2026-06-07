// import Link from "next/link";
// import { getProducts, getCategories } from "@/lib/payload";
// import ProductCard from "@/components/ProductCard";

// export default async function StorePage({ searchParams }) {
//   const { category, q, sort } = await searchParams;

//   const {
//     docs: products,
//     totalDocs,
//     totalPages,
//     page,
//   } = await getProducts({
//     category,
//     search: q,
//     sort,
//     limit: 12,
//   });

//   const categories = await getCategories();

//   return (
//     <main className="max-w-7xl mx-auto px-6 py-10">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-normal tracking-tight mb-1">
//           {category
//             ? categories.find((c) => c.slug === category)?.title || "Shop"
//             : "All Products"}
//         </h1>
//         <p className="text-sm text-neutral-500">{totalDocs} products</p>
//       </div>

//       <div className="flex gap-10">
//         {/* Sidebar - Filters */}
//         <aside className="hidden lg:block w-52 shrink-0">
//           {/* Categories */}
//           <div className="mb-8">
//             <h3 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">
//               Categories
//             </h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="/store"
//                   className={`text-sm transition-colors ${!category ? "text-black font-medium" : "text-neutral-500 hover:text-black"}`}
//                 >
//                   All Products
//                 </Link>
//               </li>
//               {categories.map((cat) => (
//                 <li key={cat.id}>
//                   <Link
//                     href={`/store?category=${cat.slug}`}
//                     className={`text-sm transition-colors ${category === cat.slug ? "text-black font-medium" : "text-neutral-500 hover:text-black"}`}
//                   >
//                     {cat.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Sort */}
//           <div>
//             <h3 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">
//               Sort By
//             </h3>
//             <ul className="space-y-2">
//               {[
//                 { label: "Newest", value: "-createdAt" },
//                 { label: "Oldest", value: "createdAt" },
//                 { label: "Price: Low to High", value: "priceInNGN" },
//                 { label: "Price: High to Low", value: "-priceInNGN" },
//               ].map((option) => (
//                 <li key={option.value}>
//                   <Link
//                     href={`/store?${category ? `category=${category}&` : ""}${q ? `q=${q}&` : ""}sort=${option.value}`}
//                     className={`text-sm transition-colors ${sort === option.value ? "text-black font-medium" : "text-neutral-500 hover:text-black"}`}
//                   >
//                     {option.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </aside>

//         {/* Products Grid */}
//         <div className="flex-1">
//           {/* Search result info */}
//           {q && (
//             <div className="mb-6 flex items-center justify-between">
//               <p className="text-sm text-neutral-500">
//                 Search results for{" "}
//                 <span className="text-black font-medium">
//                   {" "}
//                   &quot; {q}&quot;
//                 </span>
//               </p>
//               <Link
//                 href="/store"
//                 className="text-xs tracking-widest uppercase text-neutral-500 hover:text-black transition-colors"
//               >
//                 Clear
//               </Link>
//             </div>
//           )}

//           {products.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-24 text-center">
//               <p className="text-lg font-normal text-neutral-400 mb-4">
//                 No products found
//               </p>
//               <Link
//                 href="/store"
//                 className="text-xs tracking-widest uppercase text-black underline"
//               >
//                 View all products
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-center gap-2 mt-12">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                 <Link
//                   key={p}
//                   href={`/store?${category ? `category=${category}&` : ""}${q ? `q=${q}&` : ""}${sort ? `sort=${sort}&` : ""}page=${p}`}
//                   className={`w-9 h-9 flex items-center justify-center text-sm transition-colors ${
//                     Number(page) === p
//                       ? "bg-black text-white"
//                       : "text-neutral-500 hover:text-black border border-neutral-200"
//                   }`}
//                 >
//                   {p}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

import Link from "next/link";
import { getProducts, getCategories } from "@/lib/payload";
import ProductCard from "@/components/ProductCard";
import MobileFilters from "@/components/MobileFilters";

export default async function StorePage({ searchParams }) {
  const { category, q, sort } = await searchParams;

  const {
    docs: products,
    totalDocs,
    totalPages,
    page,
  } = await getProducts({
    category,
    search: q,
    sort,
    limit: 12,
  });

  const categories = await getCategories();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal tracking-tight mb-1">
            {category
              ? categories.find((c) => c.slug === category)?.title || "Shop"
              : "All Products"}
          </h1>
          <p className="text-sm text-neutral-500">{totalDocs} products</p>
        </div>

        {/* Mobile Filter Button */}
        <MobileFilters
          categories={categories}
          currentCategory={category}
          currentSort={sort}
          currentSearch={q}
        />
      </div>

      <div className="flex gap-10">
        {/* Sidebar - Desktop only */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="mb-8">
            <h3 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/store"
                  className={`text-sm transition-colors ${!category ? "text-black font-medium" : "text-neutral-500 hover:text-black"}`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/store?category=${cat.slug}`}
                    className={`text-sm transition-colors ${category === cat.slug ? "text-black font-medium" : "text-neutral-500 hover:text-black"}`}
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">
              Sort By
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Newest", value: "-createdAt" },
                { label: "Oldest", value: "createdAt" },
                { label: "Price: Low to High", value: "priceInNGN" },
                { label: "Price: High to Low", value: "-priceInNGN" },
              ].map((option) => (
                <li key={option.value}>
                  <Link
                    href={`/store?${category ? `category=${category}&` : ""}${q ? `q=${q}&` : ""}sort=${option.value}`}
                    className={`text-sm transition-colors ${sort === option.value ? "text-black font-medium" : "text-neutral-500 hover:text-black"}`}
                  >
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {q && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                Results for{" "}
                <span className="text-black font-medium">"{q}"</span>
              </p>
              <Link
                href="/store"
                className="text-xs tracking-widest uppercase text-neutral-500 hover:text-black transition-colors"
              >
                Clear
              </Link>
            </div>
          )}

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-normal text-neutral-400 mb-4">
                No products found
              </p>
              <Link
                href="/store"
                className="text-xs tracking-widest uppercase text-black underline"
              >
                View all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/store?${category ? `category=${category}&` : ""}${q ? `q=${q}&` : ""}${sort ? `sort=${sort}&` : ""}page=${p}`}
                  className={`w-9 h-9 flex items-center justify-center text-sm transition-colors ${
                    Number(page) === p
                      ? "bg-black text-white"
                      : "text-neutral-500 hover:text-black border border-neutral-200"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
