import { Grid2 as Grid, Typography, Link, Stack } from "@mui/material";

interface ITitledListProps {
  title?: string;
  linkItem: {
    year: string;
    linkName: string;
    linkUrl?: string;
    type?: string;
  }[];
}

const TitledList = ({ title, linkItem }: ITitledListProps) => {
  return (
    <Grid size={3} sx={{ marginTop: "4rem" }}>
      <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: "0.5rem" }}>
        {title}
      </Typography>
      <Stack rowGap={1}>
        {linkItem.map(({ year, linkUrl, linkName, type }) => (
          <Typography variant="h5">
            {year}{" "}
            {linkUrl ? (
              <Link target="_blank" rel="noopener" href={linkUrl}>
                {linkName}
              </Link>
            ) : (
              linkName
            )}
            {Boolean(type) && `: ${type}`}
          </Typography>
        ))}
      </Stack>
    </Grid>
  );
};

export default TitledList;
