import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from "../../config/api";
import type { NewProduct, Product } from "../../types/product";
import { writeCustomProducts } from "../customProductsStorage";

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  likedIds: number[];
  selected: Product | null;
  customIds: number[];
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  likedIds: [],
  selected: null,
  customIds: [],
};

function persistCustomProducts(state: Pick<ProductsState, "items" | "customIds">) {
  const customProducts = state.items.filter((product) => state.customIds.includes(product.id));
  writeCustomProducts(customProducts);
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchAll", async (_: void, { rejectWithValue }) => {
  try {
    const response = await axios.get<Product[]>(GET_PRODUCTS);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string } | undefined>;
    const status = error.response?.status;
    const backendMessage =
      (error.response?.data as { message?: string } | undefined)?.message ||
      error.message;
    const message =
      status === 404
        ? "Ресурс не найден (404). Проверьте адрес."
        : status === 500
        ? "Ошибка сервера (500). Попробуйте позже."
        : `Не удалось загрузить товары${backendMessage ? `: ${backendMessage}` : ""}`;
    return rejectWithValue(message);
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string; state: { products: ProductsState } }
>(
  "products/fetchById",
  async (id, { rejectWithValue, getState }) => {
    const local = getState().products.items.find((p) => p.id === id);
    if (local) return local;
    try {
      const response = await axios.get<Product>(GET_PRODUCT_BY_ID(id));
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string } | undefined>;
      const status = error.response?.status;
      const backendMessage =
        (error.response?.data as { message?: string } | undefined)?.message ||
        error.message;
      const message =
        status === 404
          ? "Товар не найден (404)."
          : status === 500
          ? "Ошибка сервера (500). Попробуйте позже."
          : `Не удалось загрузить товар${backendMessage ? `: ${backendMessage}` : ""}`;
      return rejectWithValue(message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
      const id = action.payload;
      const idx = state.likedIds.indexOf(id);
      if (idx >= 0) {
        state.likedIds.splice(idx, 1);
      } else {
        state.likedIds.push(id);
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.items = state.items.filter((p) => p.id !== id);
      const idx = state.likedIds.indexOf(id);
      if (idx >= 0) state.likedIds.splice(idx, 1);
      const customIdx = state.customIds.indexOf(id);
      if (customIdx >= 0) {
        state.customIds.splice(customIdx, 1);
        persistCustomProducts(state);
      }
    },
    addProduct(state, action: PayloadAction<NewProduct>) {
      const created: Product = { id: Date.now(), ...action.payload };
      state.items.unshift(created);
      state.customIds.unshift(created.id);
      persistCustomProducts(state);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const updated = action.payload;
      const updatedId = String(updated.id);
      const idx = state.items.findIndex((p) => String(p.id) === updatedId);
      if (idx >= 0) {
        state.items[idx] = updated;
      } else {
        state.items.unshift(updated);
      }
      const hasCustomId = state.customIds.some((id) => String(id) === updatedId);
      if (!hasCustomId) {
        state.customIds.unshift(updated.id);
      }
      persistCustomProducts(state);
    },
    hydrateCustomProducts(state, action: PayloadAction<Product[]>) {
      const incoming = action.payload
        .map((product) => ({
          ...product,
          id: Number(product.id),
        }))
        .filter((product) => Number.isFinite(product.id));

      for (const product of incoming) {
        const idx = state.items.findIndex((item) => item.id === product.id);
        if (idx >= 0) {
          state.items[idx] = product;
        } else {
          state.items.unshift(product);
        }
        if (!state.customIds.includes(product.id)) {
          state.customIds.push(product.id);
        }
      }

      state.customIds = state.customIds.filter((id) => state.items.some((item) => item.id === id));
      state.items.sort((a, b) => {
        const aCustom = state.customIds.includes(a.id);
        const bCustom = state.customIds.includes(b.id);
        if (aCustom && !bCustom) return -1;
        if (!aCustom && bCustom) return 1;
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const incoming = action.payload;
        const existingById = new Map(state.items.map((p) => [String(p.id), p] as const));
        for (const product of incoming) {
          if (state.customIds.includes(product.id)) continue;
          existingById.set(String(product.id), product);
        }
        state.items = Array.from(existingById.values());
        persistCustomProducts(state);
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string | undefined) ?? action.error.message ?? "Не удалось загрузить товары";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selected = action.payload;
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
        else state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string | undefined) ?? action.error.message ?? "Не удалось загрузить товар";
      });
  },
});

export const { toggleLike, removeProduct, addProduct, updateProduct, hydrateCustomProducts } = productsSlice.actions;
export default productsSlice.reducer;

