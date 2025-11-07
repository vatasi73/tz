export const card = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "320px 1fr" },
  gap: 3,
  alignItems: "start",
  p: 2,
};

export const cardMedia = {
  display: "flex",
  justifyContent: "center",
};

export const image = {
  width: "100%",
  height: 320,
  objectFit: "contain" as "contain",
  borderRadius: 8,
};

export const cardContent = {
  p: 0,
  display: "flex",
  flexDirection: "column",
  minHeight: 320,
};

export const price = {
  variant: "h6",
  color: "primary",
  mb: 1,
};

export const category = {
  variant: "subtitle1",
  color: "text.secondary",
  mb: 2,
};

export const description = {
  variant: "body1",
  lineHeight: 1.6,
  flexGrow: 1,
};

export const buttonStack = {
  justifyContent: 'flex-end',
  direction: "row",
  spacing: 2,
  mt: 'auto',
};
