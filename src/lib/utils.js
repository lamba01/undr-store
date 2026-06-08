export function getImageUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url.split("?")[0];
  return `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${url}`;
}
