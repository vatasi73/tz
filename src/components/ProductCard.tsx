import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleLike, removeProduct } from "../store/slices/productsSlice";
import * as theme from "./ProductCardTheme";

const FALLBACK_IMAGE =
  "https://otvet.imgsmail.ru/download/93b8a342382b9770eb6260df06b81340_i-15381.jpg";

type ProductCardProps = {
  product: any;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const likedIds = useAppSelector((state) => state.products.likedIds);
  const liked = likedIds.includes(product.id);
  const [imageSrc, setImageSrc] = useState<string>(product.image || FALLBACK_IMAGE);

  useEffect(() => {
    const trimmed = product.image?.trim();
    setImageSrc(trimmed ? trimmed : FALLBACK_IMAGE);
  }, [product.image]);

  const handleImageError = () => {
    if (imageSrc !== FALLBACK_IMAGE) {
      setImageSrc(FALLBACK_IMAGE);
    }
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleRemoveProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeProduct(product.id));
  };

  return (
    <Box sx={theme.card}>
      <Box sx={theme.topSection}>
        <IconButton
          aria-label={liked ? "Убрать из избранного" : "Добавить в избранное"}
          onClick={handleToggleLike}
          sx={theme.iconButton}
        >
          {liked ? (
            <FavoriteIcon htmlColor="#e91e63" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton
          aria-label="Удалить товар"
          onClick={handleRemoveProduct}
          sx={theme.iconButton}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>

      <Link href={`/products/${product.id}`} passHref>
        <Box sx={{ textDecoration: "none", color: "inherit" }}>
          <Image
            src={imageSrc}
            alt={product.title}
            width={400}
            height={180}
            style={theme.image}
            onError={handleImageError}
          />
          <Typography sx={theme.title}>{product.title}</Typography>
          <Typography sx={theme.description}>{product.description}</Typography>
          <Typography sx={theme.price}>${product.price.toFixed(2)}</Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default ProductCard;
