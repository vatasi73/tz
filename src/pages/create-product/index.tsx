import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addProduct, updateProduct } from "../../store/slices/productsSlice";
import { Box, Paper, Typography } from "@mui/material";
import ProductFormFields from "../../components/ProductFormFields";
import ActionButtons from "../../components/ActionButtons";

export default function CreateProductPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector((s) => s.products);
  const idParam = router.query?.id as string | undefined;
  const editId = useMemo(
    () => (idParam ? Number(idParam) : undefined),
    [idParam]
  );
  const productToEdit = useMemo(
    () =>
      editId !== undefined && !Number.isNaN(editId)
        ? items.find((p) => p.id === editId)
        : undefined,
    [items, editId]
  );

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setPrice(String(productToEdit.price));
      setDescription(productToEdit.description);
      setCategory(productToEdit.category);
      setImage(productToEdit.image);
    }
  }, [productToEdit]);

  function validate() {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Обязательное поле";
    const p = Number(price);
    if (!price || Number.isNaN(p) || p <= 0) e.price = "Цена должна быть > 0";
    if (!description.trim()) e.description = "Обязательное поле";
    if (!category.trim()) e.category = "Обязательное поле";
    try {
      if (!image.trim()) throw new Error("required");
      new URL(image);
    } catch (_) {
      e.image = "Укажите корректный URL";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const pNum = Number(price);
    if (productToEdit && editId !== undefined) {
      dispatch(
        updateProduct({
          id: editId,
          title: title.trim(),
          price: pNum,
          description: description.trim(),
          category: category.trim(),
          image: image.trim(),
        })
      );
    } else {
      dispatch(
        addProduct({
          title: title.trim(),
          price: pNum,
          description: description.trim(),
          category: category.trim(),
          image: image.trim(),
        })
      );
    }
    router.push("/products");
  }

  return (
    <Box
      sx={{
        maxWidth: 640,
        mx: "auto",
        p: 3,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        {productToEdit ? "Редактирование продукта" : "Создание продукта"}
      </Typography>

      <Paper
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          mt: 2,
        }}
        elevation={3}
      >
        <ProductFormFields
          title={title}
          price={price}
          description={description}
          category={category}
          image={image}
          errors={errors}
          setTitle={setTitle}
          setPrice={setPrice}
          setDescription={setDescription}
          setCategory={setCategory}
          setImage={setImage}
        />
        <ActionButtons
          isEdit={!!productToEdit}
          onCancel={() => router.push("/products")}
        />
      </Paper>
    </Box>
  );
}
