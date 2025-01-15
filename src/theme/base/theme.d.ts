import { CSSProperties } from "react";
import "@mui/material";
import "@mui/material/styles";
import "@mui/material/styles/createPalette";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    p: CSSProperties;
    span: CSSProperties;
    nav: CSSProperties;
    h1_medium: CSSProperties;
    h2_medium: CSSProperties;
    h3_medium: CSSProperties;
    h4_medium: CSSProperties;
    h5_medium: CSSProperties;
    h6_medium: CSSProperties;
    p_medium: CSSProperties;
    span_medium: CSSProperties;
    button_medium: CSSProperties;
  }

  interface TypographyVariantsOptions {
    p?: CSSProperties;
    span?: CSSProperties;
    nav?: CSSProperties;
    h1_medium?: CSSProperties;
    h2_medium?: CSSProperties;
    h3_medium?: CSSProperties;
    h4_medium?: CSSProperties;
    h5_medium?: CSSProperties;
    h6_medium?: CSSProperties;
    p_medium?: CSSProperties;
    span_medium?: CSSProperties;
    nav_medium?: CSSProperties;
    button_medium?: CSSProperties;
  }
}

// Update Typography's props to include custom variants
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    p: true;
    span: true;
    nav: true;
    h1_medium: true;
    h2_medium: true;
    h3_medium: true;
    h4_medium: true;
    h5_medium: true;
    h6_medium: true;
    p_medium: true;
    span_medium: true;
    button_medium: true;
  }
}
