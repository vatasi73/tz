import { Box } from "@mui/material";
import * as theme from "./EmptyStateMessageTheme";

interface EmptyStateMessageProps {
  message: string;
}

const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({ message }) => {
  return (
    <Box sx={theme.messageWrapper}>
      {message}
    </Box>
  );
};

export default EmptyStateMessage;
