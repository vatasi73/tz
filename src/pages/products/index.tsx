import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchProducts } from "../../store/slices/productsSlice";
import ProductListFilters from "@/components/ProductListFilters";
import ProductCard from "@/components/ProductCard";
import PaginationComponent from "@/components/PaginationComponent";
import useProductPagination from "@/components/hooks/useProductPagination";
import EmptyStateMessage from "@/components/EmptyStateMessage";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<
    "none" | "priceAsc" | "priceDesc" | "titleAsc" | "titleDesc"
  >("none");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const {
    paginated,
    currentPage,
    totalPages,
    setPage,
    isFavoritesEmpty,
    isSearchEmpty,
  } = useProductPagination(showOnlyFavorites, search, sortBy);

  return (
    <Box>
      <ProductListFilters
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={setShowOnlyFavorites}
      />
      {isFavoritesEmpty ? (
        <EmptyStateMessage message="Список избранного пуст." />
      ) : isSearchEmpty ? (
        <EmptyStateMessage message="По вашему запросу ничего не найдено." />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 2,
            marginTop: 2,
          }}
        >
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      )}
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </Box>
  );
}
