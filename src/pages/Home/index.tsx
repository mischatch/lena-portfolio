import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_FEATURE_FLAGS, GET_PROJECTS_QUERY } from "../../queries/index";
import { useEffect, useState, useCallback } from "react";
import Loading from "../Loading";
import { PageMeta } from "pages/components/PageMeta";
import { Box, Container, Paper, Typography } from "@mui/material";
import { Masonry } from "@mui/lab";
import ProjectsLoader from "./components/ProjectsLoader";
import { IGetProjects } from "interfaces/get-projects.interface";
import MaintenanceLoader from "./components/MaintenanceLoader";

export default function Home() {
  const [data, setData] = useState<IGetProjects>();
  const {
    loading: projectsLoading,
    error,
    refetch: fetchProjects,
  } = useQuery<IGetProjects>(GET_PROJECTS_QUERY);

  const getData = useCallback(async () => {
    const fetchedData = await fetchProjects();
    setData(fetchedData.data);
  }, [fetchProjects]);

  const { loading: ffLoading, data: featureFlags } =
    useQuery(GET_FEATURE_FLAGS);
  useEffect(() => {
    if (featureFlags) {
      const { value } = featureFlags.featureFlags[0];
      if (!ffLoading && !value) {
        getData();
      }
    }
  }, [fetchProjects, ffLoading, featureFlags, getData]);

  if (ffLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (featureFlags.featureFlags[0].value) {
    return <MaintenanceLoader />;
  }

  if (projectsLoading || !data) {
    return <ProjectsLoader />;
  }
  return (
    <Container>
      <PageMeta title="Elena Byalaya — Portfolio" />
      <Masonry columns={4} spacing={2}>
        {data.projects.map((project, i) => (
          <Link
            to={{
              pathname: `/project/${project.id}`,
              // state: { projectId: project.projectTitle.split(" ").join("-") },
            }}
            style={{
              textDecoration: "none",
              display: "block",
            }}
          >
            <Paper key={i} elevation={0}>
              <Box
                component="img"
                width="100%"
                alt={`${project.projectTitle} — Preview Image`}
                src={!!project.tileImage.url ? project.tileImage.url : ""}
              />
              <Typography variant="p">{project.projectTitle}</Typography>
            </Paper>
          </Link>
        ))}
      </Masonry>
    </Container>
  );
}
