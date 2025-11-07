import type { Product } from "../types/product";

const STORAGE_KEY = "customProducts";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isValidProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    (typeof candidate.id === "number" || typeof candidate.id === "string") &&
    typeof candidate.title === "string" &&
    typeof candidate.description === "string" &&
    typeof candidate.category === "string" &&
    (typeof candidate.price === "number" || typeof candidate.price === "string") &&
    typeof candidate.image === "string"
  );
}

export function readCustomProducts(): Product[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(isValidProduct)
      .map((product) => ({
        ...product,
        id: Number(product.id),
        price: Number(product.price),
      }))
      .filter((product) => Number.isFinite(product.id) && Number.isFinite(product.price));
  } catch (error) {
    console.warn("Failed to read custom products from localStorage", error);
    return [];
  }
}

export function writeCustomProducts(products: Product[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.warn("Failed to write custom products to localStorage", error);
  }
}


