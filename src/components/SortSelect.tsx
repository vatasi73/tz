import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import * as theme from "./SortSelectTheme";

type SortOption = "none" | "priceAsc" | "priceDesc" | "titleAsc" | "titleDesc";

type SortSelectProps = {
  sortBy: SortOption;
  setSortBy: React.Dispatch<React.SetStateAction<SortOption>>;
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "none", label: "Без сортировки" },
  { value: "priceAsc", label: "Цена: по возрастанию" },
  { value: "priceDesc", label: "Цена: по убыванию" },
  { value: "titleAsc", label: "Название: A–Z" },
  { value: "titleDesc", label: "Название: Z–A" },
];

const SortSelect: React.FC<SortSelectProps> = ({ sortBy, setSortBy }) => (
  <FormControl size="small" sx={theme.formControl}>
    <InputLabel id="sort-label">Сортировка</InputLabel>
    <Select
      labelId="sort-label"
      value={sortBy}
      label="Сортировка"
      onChange={(e) => setSortBy(e.target.value as SortOption)}
    >
      {sortOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SortSelect;
