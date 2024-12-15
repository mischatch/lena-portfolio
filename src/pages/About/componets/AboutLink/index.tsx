import { Grid2 as Grid, Link, Typography } from "@mui/material";

interface IAboutLinkProps {
  id: string;
  title: string;
  url: string;
}

const AboutLink = ({ id, title, url }: IAboutLinkProps) => {
  let urlAddress;
  switch (title.toLowerCase()) {
    case "email":
      urlAddress = `mailto:${url}`;
      break;
    case "instagram":
      urlAddress = `https://instagram.com/${url.slice(1)}`;
      break;
    default:
      urlAddress = url;
  }

  return (
    <Grid key={id} size={3}>
      <Typography variant="h5">
        {title && title !== "email" && `${title}: `}
        <Link target="_blank" rel="noopener" href={urlAddress}>
          {url}
        </Link>
      </Typography>
    </Grid>
  );
};

export default AboutLink;
