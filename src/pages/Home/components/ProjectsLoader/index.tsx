import { Masonry } from "@mui/lab";
import { Skeleton } from "@mui/material";

const heights = [
  150, 130, 90, 170, 110, 150, 130, 180, 150, 190, 100, 150, 130, 150, 180,
];

const ProjectsLoader = () => {
  return (
    <>
      <Masonry columns={4} spacing={2}>
        {heights.map((height, index) => (
          <Skeleton key={index} height={height} />
        ))}
      </Masonry>
    </>
  );
};

export default ProjectsLoader;
