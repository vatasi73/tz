import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchProductById,
  toggleLike,
} from "../../../store/slices/productsSlice";

import { Container } from "@mui/material";
import ProductLoadingError from "../../../components/ProductLoadingError";
import DetailProductCard from "../../../components/DetailProductCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppButton from "@/components/ui/AppButton";
import * as theme from "./indexTheme";

export default function ProductDetailPage() {
  const { query } = useRouter();
  const idStr = query.id as string | undefined;
  const id = idStr ? Number(idStr) : undefined;

  const dispatch = useAppDispatch();
  const { selected, loading, error, likedIds } = useAppSelector(
    (s) => s.products
  );

  useEffect(() => {
    if (id !== undefined && !Number.isNaN(id)) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const liked = id !== undefined ? likedIds.includes(id) : false;

  return (
    <Container sx={theme.container} maxWidth="md">
      <AppButton
        component={Link}
        href="/products"
        startIcon={<ArrowBackIcon />}
        sx={theme.backButton}
      >
        Назад к списку
      </AppButton>
      <ProductLoadingError loading={loading} error={error} />
      {selected && (
        <DetailProductCard
          product={selected}
          liked={liked}
          onLikeToggle={() => dispatch(toggleLike(id!))}
          onEdit={() => {}}
        />
      )}
    </Container>
  );
}
