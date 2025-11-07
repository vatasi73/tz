import { Stack, Pagination } from "@mui/material";

type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  setPage,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      mt={3}
      flexWrap="wrap"
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => setPage(page)}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
      />
    </Stack>
  );
};

export default PaginationComponent;
