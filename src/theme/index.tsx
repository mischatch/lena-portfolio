import { createTheme } from "@mui/material/styles";

import * as components from "./components";
import { baseTheme } from "./base";

const theme = createTheme(baseTheme, { components });

export default theme;
