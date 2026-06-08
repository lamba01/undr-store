// import Link from "next/link";
// import Image from "next/image";

// const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

// export default function ProductCard({ product }) {
//   const image = product?.gallery?.[0]?.image;
//   const imageUrl = image?.url ? `${PAYLOAD_URL}${image.url}` : null;

//   return (
//     <Link href={`/store/${product.slug}`} className="group">
//       <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden mb-3">
//         {imageUrl ? (
//           <Image
//             src={imageUrl}
//             alt={image?.alt || product.title}
//             fill
//             className="object-cover group-hover:scale-105 transition-transform duration-500"
//             sizes="(max-width: 768px) 50vw, 25vw"
//           />
//         ) : (
//           <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
//             <span className="text-neutral-400 text-xs">No image</span>
//           </div>
//         )}
//       </div>
//       <div>
//         <h3 className="text-sm font-normal text-black mb-1 group-hover:underline">
//           {product.title}
//         </h3>
//         <p className="text-sm text-neutral-600">
//           ₦{product.priceInNGN?.toLocaleString()}
//         </p>
//       </div>
//     </Link>
//   );
// }

import Link from "next/link";
import Image from "next/image";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

export default function ProductCard({ product }) {
  const image = product?.gallery?.[0]?.image;
  const imageUrl = image?.url
    ? image.url.startsWith("http")
      ? image.url.split("?")[0]
      : `${PAYLOAD_URL}${image.url}`
    : null;

  return (
    <Link href={`/store/${product.slug}`} className="group">
      <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden mb-3">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt || product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
            <span className="text-neutral-400 text-xs">No image</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-normal text-black mb-1 group-hover:underline">
          {product.title}
        </h3>
        <p className="text-sm text-neutral-600">
          ₦{product.priceInNGN?.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
