import AppTextField from "./ui/AppTextField";

interface ProductFormFieldsProps {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  errors: Record<string, string>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
  title,
  price,
  description,
  category,
  image,
  errors,
  setTitle,
  setPrice,
  setDescription,
  setCategory,
  setImage,
}) => {
  const fields = [
    {
      label: "Название *",
      value: title,
      onChange: setTitle,
      error: errors.title,
    },
    {
      label: "Цена *",
      type: "number",
      value: price,
      onChange: setPrice,
      error: errors.price,
    },
    {
      label: "Категория *",
      value: category,
      onChange: setCategory,
      error: errors.category,
    },
    {
      label: "Изображение (URL) *",
      value: image,
      onChange: setImage,
      error: errors.image,
    },
    {
      label: "Описание *",
      value: description,
      onChange: setDescription,
      error: errors.description,
      multiline: true,
      rows: 5,
    },
  ];

  return (
    <>
      {fields.map((field, index) => (
        <AppTextField
          key={index}
          label={field.label}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          error={!!field.error}
          helperText={field.error}
          fullWidth
          type={field.type || "text"}
          multiline={field.multiline || false}
          rows={field.rows || 1}
        />
      ))}
    </>
  );
};

export default ProductFormFields;
