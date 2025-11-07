import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store/hooks";

const PAGE_SIZE = 10;

export default function useProductPagination(
  showOnlyFavorites: boolean,
  search: string,
  sortBy: "none" | "priceAsc" | "priceDesc" | "titleAsc" | "titleDesc"
) {
  const { items, likedIds } = useAppSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
console.log(items);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 1000);
    return () => clearTimeout(id);
  }, [search]);

  const productsToShow = useMemo(
    () =>
      showOnlyFavorites ? items.filter((p) => likedIds.includes(p.id)) : items,
    [showOnlyFavorites, items, likedIds]
  );

  const filteredBySearch = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return productsToShow;
    return productsToShow.filter((p) => p.title.toLowerCase().includes(q));
  }, [productsToShow, debouncedSearch]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredBySearch];
    switch (sortBy) {
      case "priceAsc":
        copy.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        copy.sort((a, b) => b.price - a.price);
        break;
      case "titleAsc":
        copy.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        copy.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return copy;
  }, [filteredBySearch, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginated = sortedProducts.slice(start, end);

  return {
    paginated,
    currentPage,
    totalPages,
    setPage,
    isFavoritesEmpty: showOnlyFavorites && productsToShow.length === 0,
    isSearchActive: debouncedSearch.trim().length > 0,
    isSearchEmpty: debouncedSearch.trim().length > 0 && filteredBySearch.length === 0,
  };
}
