const URLS = ["https://api.abcz.workers.dev/api/bazardor"];

async function get(path) {
  for (const base of URLS) {
    try {
      const r = await fetch(base + path);
      if (r.ok) return await r.json();
    } catch (e) {}
  }
  throw new Error("API failed");
}

const UNITS = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export function normalize(p) {
  // The API may send negative numbers for drops, so use the absolute value
  // and let "dir" decide the direction.
  const pct = Math.abs(Number(p.change?.pct ?? 0));
  const dir = p.change?.dir;
  const change = dir === "up" ? pct : dir === "down" ? -pct : 0;

  return {
    ...p,
    slug: String(p.slug ?? p.id),
    name: p.nameBn ?? p.name,
    emoji: p.image ?? p.categoryIcon ?? "🛒",
    unit: UNITS[p.unit] ?? p.unit,
    price: Number(p.today ?? 0),
    change,
    markets: p.markets ?? [],
  };
}

const list = (d, k) => (Array.isArray(d) ? d : d?.[k] ?? d?.data ?? []);

export const getProducts = async (cat) =>
  list(await get("/products" + (cat ? `?category=${cat}` : "")), "products").map(normalize);

export const getProduct = async (slug) => {
  const all = await getProducts();
  const found = all.find((p) => p.slug === slug || String(p.id) === slug);
  if (!found) throw new Error("Not found");
  return found;
};

export const getCategories = async () =>
  list(await get("/categories"), "categories");