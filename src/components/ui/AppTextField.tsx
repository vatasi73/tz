import { TextField, type TextFieldProps } from "@mui/material";

export default function AppTextField(props: TextFieldProps) {
  return <TextField size="small" variant="outlined" {...props} />;
}
