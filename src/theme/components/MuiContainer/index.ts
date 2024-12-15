import { Components } from "@mui/material";
import { baseTheme } from "theme/base";

export const MuiContainer: NonNullable<Components["MuiContainer"]> = {
  defaultProps: {
    disableGutters: true,
    maxWidth: false,
  },
  styleOverrides: {
    root: {
      /* TODO: remove when different screens are implemented */
      [baseTheme.breakpoints.up("xs")]: {
        width: "100%",
        padding: "0 3.125rem",
      },
    },
  },
};
