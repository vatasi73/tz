import { FormControlLabel, Checkbox, Box, Link } from "@mui/material";
import AppTextField from "./ui/AppTextField";
import AppButton from "./ui/AppButton";
import SortSelect from "./SortSelect";
import * as theme from "./ProductListFiltersTheme";

type SortOption = "none" | "priceAsc" | "priceDesc" | "titleAsc" | "titleDesc";

type ProductListFiltersProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: SortOption;
  setSortBy: React.Dispatch<React.SetStateAction<SortOption>>;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavoriteCheckbox: React.FC<{
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showOnlyFavorites, setShowOnlyFavorites }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={showOnlyFavorites}
        onChange={(e) => setShowOnlyFavorites(e.target.checked)}
      />
    }
    label="Показать только избранное"
  />
);

const ProductListFilters: React.FC<ProductListFiltersProps> = ({
  search,
  setSearch,
  sortBy,
  setSortBy,
  showOnlyFavorites,
  setShowOnlyFavorites,
}) => (
  <Box sx={theme.filtersWrapper}>
    <AppTextField
      label="Поиск по названию"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
    <FavoriteCheckbox
      showOnlyFavorites={showOnlyFavorites}
      setShowOnlyFavorites={setShowOnlyFavorites}
    />
    <AppButton component={Link} href="/create-product" sx={theme.button}>
      Создать карточку
    </AppButton>
  </Box>
);

export default ProductListFilters;
