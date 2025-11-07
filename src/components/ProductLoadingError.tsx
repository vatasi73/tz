import { Box, CircularProgress, Alert } from "@mui/material";
import * as theme from "./ProductLoadingErrorTheme";

interface ProductLoadingErrorProps {
  loading: boolean;
  error: string | null;
}

const ProductLoadingError: React.FC<ProductLoadingErrorProps> = ({
  loading,
  error,
}) => {
  return (
    <>
      {loading && (
        <Box sx={theme.loadingWrapper}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={theme.alert}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default ProductLoadingError;
