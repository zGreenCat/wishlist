export type Priority = "me encantaría" | "me gustaría" | "sería bacán";
export type PriceRange = "bajo" | "medio" | "alto";
export type Category =
  | "ropa"
  | "juegos"
  | "otros";

export interface WishlistItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  priceRange: PriceRange;
  images: string[];
  link?: string;
  isSteam?: boolean;
}

export const categories: { value: Category; label: string }[] = [
  { value: "ropa", label: "Ropa / Accesorios" },
  { value: "juegos", label: "Juegos / Hobbies" },
  { value: "otros", label: "Otros" },
];

export const priceRanges: { value: PriceRange; label: string; description: string }[] = [
  { value: "bajo", label: "Bajo", description: "Menos de $20.000" },
  { value: "medio", label: "Medio", description: "$20.000 - $60.000" },
  { value: "alto", label: "Alto", description: "Más de $60.000" },
];

export const priorities: { value: Priority; label: string }[] = [
  { value: "me encantaría", label: "Me encantaría" },
  { value: "me gustaría", label: "Me gustaría" },
  { value: "sería bacán", label: "Sería bacán" },
];

const localWebpAssets = [
  "/barra.webp",
  "/cuero1.webp",
  "/cuero2.webp",
  "/expedition-33.webp",
  "/polo.webp",
  "/polo2.webp",
  "/sueter.webp",
  "sueter2.webp",
  "/zapato.webp",
  "/zapato2.webp",
  "/zapato3.webp",
  "/monster.webp",
  "/cartas.webp",
  "cartas2.webp",
  "cartas3.webp",
  "/termo.webp",
  "/termo2.webp",
  "termo3.webp",
  "mancuernas.webp",
  "mancuernas2.webp",
];

function normalizeBaseName(assetPath: string): string {
  const fileName = assetPath.split("/").pop() ?? "";
  const nameWithoutExtension = fileName.replace(/\.webp$/i, "");
  return nameWithoutExtension.replace(/[-_ ]?\d+$/, "").toLowerCase();
}

function sortVariantPaths(paths: string[]): string[] {
  return [...paths].sort((a, b) =>
    a.localeCompare(b, "es", { numeric: true, sensitivity: "base" })
  );
}

const groupedImageMap = localWebpAssets.reduce<Map<string, string[]>>((acc, assetPath) => {
  const baseName = normalizeBaseName(assetPath);
  const current = acc.get(baseName) ?? [];
  current.push(assetPath);
  acc.set(baseName, current);
  return acc;
}, new Map<string, string[]>());

const productDetails: Record<
  string,
  Pick<WishlistItem, "name" | "description" | "category" | "priceRange"> & {
    link?: string;
    isSteam?: boolean;
  }
> = {
  barra: {
    name: "Barra pre-olimpica Z",
    description: "Referencia de estilo para una barra simple y funcional.",
    category: "otros",
    priceRange: "medio",
  },
  cuero: {
    name: "Chaqueta de cuero",
    description: "Varias referencias de acabados y siluetas para una misma idea.",
    category: "ropa",
    priceRange: "alto",
  },
  expedition: {
    name: "Expedition 33",
    description: "Juego de Steam. Solo comprar en oferta.",
    category: "juegos",
    priceRange: "medio",
    isSteam: true,
    link: "https://store.steampowered.com/app/1903340/Clair_Obscur_Expedition_33/",
  },
  polo: {
    name: "Polo",
    description: "Referencias de polos con variaciones en color y fit.",
    category: "ropa",
    priceRange: "bajo",
  },
  sueter: {
    name: "Sueter",
    description: "Idea de sueter comodo para clima frio.",
    category: "ropa",
    priceRange: "medio",
  },
  zapato: {
    name: "Zapatos",
    description: "Diferentes referencias para el mismo tipo de zapato.",
    category: "ropa",
    priceRange: "medio",
  },
    monster: {
    name: "Monster",
    description: "Six pack de monster sin azúcar. Que no sea blanca.",
    category: "ropa",
    priceRange: "medio",
  },
    cartas: {
    name: "Cartas",
    description: "Puede ser Memento Mori, Orbit Deck, Touch Origin.",
    category: "ropa",
    priceRange: "medio",
  },
    termo: {
    name: "Termo",
    description: "Para llevar cafe a la oficina wuajaj.",
    category: "ropa",
    priceRange: "medio",
  },
    mancuernas: {
    name: "Mancuernas",
    description: "Set de mancuernas.",
    category: "ropa",
    priceRange: "medio",
  }

};

export const wishlistItems: WishlistItem[] = Object.entries(productDetails)
  .map(([baseName, details], index) => ({
    id: String(index + 1),
    ...details,
    images: sortVariantPaths(groupedImageMap.get(baseName) ?? []),
  }))
  .filter((item) => item.images.length > 0);

export const siteConfig = {
  name: "Mango",
 
};
