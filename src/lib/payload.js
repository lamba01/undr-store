// const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

// export async function getProducts(params = {}) {
//   const { category, sort, search, limit = 12, page = 1 } = params;

//   let query = `${PAYLOAD_URL}/api/products?limit=${limit}&page=${page}&depth=2&where[_status][equals]=published`;

//   if (category) {
//     query += `&where[categories.slug][equals]=${category}`;
//   }

//   if (search) {
//     query += `&where[title][like]=${search}`;
//   }

//   if (sort) {
//     query += `&sort=${sort}`;
//   }

//   const res = await fetch(query, { next: { revalidate: 60 } });
//   const data = await res.json();
//   return data;
// }

// export async function getProduct(slug) {
//   const res = await fetch(
//     `${PAYLOAD_URL}/api/products?where[slug][equals]=${slug}&depth=2&limit=1`,
//     { next: { revalidate: 60 } },
//   );
//   const data = await res.json();
//   return data?.docs?.[0] || null;
// }

// export async function getCategories() {
//   const res = await fetch(`${PAYLOAD_URL}/api/categories?limit=100`, {
//     next: { revalidate: 3600 },
//   });
//   const data = await res.json();
//   return data?.docs || [];
// }

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

export async function getProducts(params = {}) {
  const { category, sort, search, limit = 12, page = 1 } = params;

  let query = `${PAYLOAD_URL}/api/products?limit=${limit}&page=${page}&depth=2&where[_status][equals]=published`;

  if (category) {
    query += `&where[categories.slug][equals]=${category}`;
  }

  if (search) {
    query += `&where[title][like]=${search}`;
  }

  if (sort) {
    query += `&sort=${sort}`;
  } else {
    query += `&sort=-createdAt`;
  }

  const res = await fetch(query, { cache: "no-store" });
  const data = await res.json();
  return data;
}

export async function getProduct(slug) {
  const res = await fetch(
    `${PAYLOAD_URL}/api/products?where[slug][equals]=${slug}&depth=2&limit=1`,
    { next: { revalidate: 60 } },
  );
  const data = await res.json();
  return data?.docs?.[0] || null;
}

export async function getCategories() {
  const res = await fetch(`${PAYLOAD_URL}/api/categories?limit=100`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data?.docs || [];
}
