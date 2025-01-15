import { AppBar, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NavItemLink } from "./NavItemLink";

const TopNav = () => {
  return (
    <Container>
      <AppBar position="static" color="transparent" elevation={0}>
        <Grid container spacing={2} sx={{ paddingY: "0.65rem" }}>
          {/* First column - Name */}
          <Grid size={3}>
            <NavItemLink to="/" primary="Elena Byalaya" />
          </Grid>

          <Grid size={3} />

          <Grid size={3} display="flex" justifyContent="flex-end">
            <NavItemLink to="/" primary="Projects" />
          </Grid>

          <Grid size={3} display="flex" justifyContent="flex-end">
            <NavItemLink to="/about" primary="About" />
          </Grid>
        </Grid>
      </AppBar>
    </Container>
  );
};

export default TopNav;
