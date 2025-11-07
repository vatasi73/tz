export const BASE_URL = "https://fakestoreapi.com";

export const GET_PRODUCTS = `${BASE_URL}/products`;
export const GET_PRODUCT_BY_ID = (id: number | string) =>
  `${BASE_URL}/products/${id}`;
