import { Card, CardContent, CardMedia, Typography, Stack, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import AppButton from "./ui/AppButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import * as theme from "./DetailProductCardTheme";

interface DetailProductCardProps {
  product: any;
  liked: boolean;
  onLikeToggle: () => void;
  onEdit: () => void;
}

const DetailProductCard: React.FC<DetailProductCardProps> = ({
  product,
  liked,
  onLikeToggle,
}) => {
  const FALLBACK_IMAGE =
    "https://otvet.imgsmail.ru/download/93b8a342382b9770eb6260df06b81340_i-15381.jpg";

  return (
    <Card sx={theme.card} elevation={3}>
      <CardMedia sx={theme.cardMedia}>
        <Image
          src={product.image || FALLBACK_IMAGE}
          alt={product.title}
          width={600}
          height={320}
          style={theme.image}
        />
      </CardMedia>
      <CardContent sx={theme.cardContent}>
      <Box>
      <Typography variant="h5">{product.title}</Typography>
        <Typography sx={theme.price}>${product.price.toFixed(2)}</Typography>
        <Typography sx={theme.category}>{product.category}</Typography>
        <Typography sx={theme.description}>{product.description}</Typography>
      </Box>
        <Stack sx={theme.buttonStack}>
          <AppButton
            variant={liked ? "contained" : "outlined"}
            color={liked ? "secondary" : "primary"}
            startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={onLikeToggle}
          >
            {liked ? "В избранном" : "В избранное"}
          </AppButton>
          <AppButton
            component={Link}
            href={`/create-product?id=${product.id}`}
            startIcon={<EditIcon />}
          >
            Редактировать
          </AppButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DetailProductCard;
