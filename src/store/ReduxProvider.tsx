"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { readCustomProducts } from "./customProductsStorage";
import { hydrateCustomProducts } from "./slices/productsSlice";

export default function ReduxProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;
    const stored = readCustomProducts();
    if (stored.length > 0) {
      store.dispatch(hydrateCustomProducts(stored));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}

