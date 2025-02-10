import { useQuery } from "@apollo/client";
import { Box, Container, Grid2 as Grid, Typography } from "@mui/material";

import Loading from "../Loading";
import { GET_INFO } from "../../queries";
import { PageMeta } from "pages/components/PageMeta";
import AboutLink from "./componets/AboutLink";
import TitledList from "./componets/TitledList";

export default function About() {
  const { loading, error, data } = useQuery(GET_INFO);

  if (loading || data === undefined) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const { aboutText, links, titledList } = data.abouts[0];

  return (
    <Container>
      <PageMeta title="Elena Byalaya — About" />
      <Box sx={{ marginTop: "0.75rem" }} />
      <Typography component="h3" variant="h3">
        {aboutText}
      </Typography>
      <Grid container sx={{ marginTop: "4rem" }}>
        {links.map(({ id, title, url }) => (
          <AboutLink id={id} title={title} url={url} />
        ))}
      </Grid>
      {titledList.map(({ title, linkItem }) => (
        <TitledList title={title} linkItem={linkItem} />
      ))}
    </Container>
  );
}
