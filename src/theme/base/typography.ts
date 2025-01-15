import { ThemeOptions } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const regularVariants: TypographyOptions = {
  h1: {
    fontSize: "4rem", // 64px
    lineHeight: "4.5rem", // 72px
    letterSpacing: "-0.02em",
  },
  h2: {
    fontSize: "3rem", // 48px
    lineHeight: "3.5rem", // 56px
    letterSpacing: "-0.02em",
  },
  h3: {
    fontSize: "2.5rem", // 40px
    // lineHeight: "3.25rem", // 52px
    lineHeight: "2.9rem", // 52px
  },
  h4: {
    fontSize: "2rem", // 32px
    lineHeight: "2.5rem", // 40px
  },
  h5: {
    fontSize: "1.6rem",
    lineHeight: "1.9375rem", // 31px
  },
  h6: {
    fontSize: "1rem",
    lineHeight: "1.1rem",
  },
  p: {
    fontSize: "0.93rem", // 16px
    lineHeight: "1rem", // 24px
  },
  span: {
    fontSize: "0.875rem", // 14px
    lineHeight: "1.25rem", // 20px
  },
  nav: {
    fontSize: "1.78125rem",
    textTransform: "uppercase",
  },
  button: {
    fontSize: "1rem", // 16px
    lineHeight: "1.5rem", // 24px
  },
};

const { h1, h2, h3, h4, h5, h6, p, span, nav, button } = regularVariants;

const mediumVariants: TypographyOptions = {
  h1_medium: { ...h1, fontWeight: 500 },
  h2_medium: { ...h2, fontWeight: 500 },
  h3_medium: { ...h3, fontWeight: 500 },
  h4_medium: { ...h4, fontWeight: 500 },
  h5_medium: { ...h5, fontWeight: 500 },
  h6_medium: { ...h6, lineHeight: "150%", fontWeight: 500 },
  p_medium: { ...p, fontWeight: 500 },
  span_medium: { ...span, fontWeight: 500 },
  nav_medium: { ...nav, fontWeight: 500 },
  button_medium: { ...button, fontWeight: 500 },
};

export const typography: NonNullable<ThemeOptions["typography"]> = () => ({
  fontFamily: "Obviously, Obviously-Regular, sans-serif",
  allVariants: {
    letterSpacing: 0,
    fontWeight: 400,
  },
  ...regularVariants,
  ...mediumVariants,
});
