import AppButton from "./ui/AppButton";
import { Box } from "@mui/material";
import * as theme from "./ActionButtonsTheme";
interface ActionButtonsProps {
  isEdit: boolean;
  onCancel: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isEdit, onCancel }) => {
  return (
    <Box sx={theme.ActionButtonsWrapper}>
      <AppButton variant="contained" color="primary" type="submit">
        {isEdit ? "Сохранить" : "Создать"}
      </AppButton>
      <AppButton onClick={onCancel}>Отмена</AppButton>
    </Box>
  );
};

export default ActionButtons;
