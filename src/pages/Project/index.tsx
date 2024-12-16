import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "queries";
import { IGetProjectById } from "../../interfaces/get-project.interface";
import {
  Box,
  Grid2 as Grid,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<IGetProjectById | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { loading, refetch: getProject } = useQuery<IGetProjectById>(
    GET_PROJECT_BY_ID,
    {
      variables: {
        id: projectId,
      },
      skip: !projectId,
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (projectId) {
      const fetchProject = async () => {
        try {
          const { data } = await getProject({
            id: projectId,
          });

          if (data) {
            setProject(data);
          }
        } catch (error) {
          console.error("Error fetching project:", error);
        }
      };

      fetchProject();
    }
  }, [projectId, getProject]);

  const handleNextImage = useCallback(() => {
    if (project?.project.image) {
      setCurrentImageIndex(prev => {
        const nextIndex = prev + 1;
        return nextIndex >= project.project.image.length ? 0 : nextIndex;
      });
    }
  }, [project]);

  const handlePrevImage = useCallback(() => {
    if (project?.project.image) {
      setCurrentImageIndex(prev => {
        return prev === 0 ? project.project.image.length - 1 : prev - 1;
      });
    }
  }, [project]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [project, handleNextImage, handlePrevImage]);

  const getImagePair = () => {
    if (!project?.project.image) return [];

    const firstIndex = currentImageIndex;
    const secondIndex = (currentImageIndex + 1) % project.project.image.length;

    return [
      project.project.image[firstIndex],
      project.project.image[secondIndex],
    ];
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>No project found</div>;
  return (
    <Container>
      {/* Carousel */}
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflow: "hidden",
              width: "100%",
            }}
          >
            {getImagePair().map((image, index) => (
              <Box
                key={`${image.url}-${index}`}
                component="img"
                src={image.url}
                sx={{
                  width: "calc(50% - 8px)",
                  height: "49rem",
                  objectFit: "contain",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            ))}
          </Box>
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "#ffffff63",
              "&:hover": { bgcolor: "background.paper" },
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "#ffffff63",
              "&:hover": { bgcolor: "background.paper" },
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        {/* Project Info Grid */}
        <Grid container spacing={2}>
          {/* Project Title */}
          <Grid size={4.5}>
            <Typography variant="h5">{project.project.projectTitle}</Typography>
            <Typography variant="p" sx={{ mt: 1 }}>
              {project.project.projectDescription}
            </Typography>
          </Grid>

          {/* Project Type */}
          <Grid size={3} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{project.project.projectType}</Typography>
          </Grid>

          {/* Fonts in Use */}
          <Grid size={1.5} sx={{ textAlign: "right" }}>
            {project.project.fontsInUse && (
              <Typography variant="h6">
                fonts in use: <br />
                {project.project.fontsInUse}
              </Typography>
            )}
          </Grid>

          {/* Empty Column */}
          <Grid size={1.5} />

          {/* Additional Info */}
          <Grid size={1.5} sx={{ textAlign: "right" }}>
            {project.project.additionalInfo && (
              <Typography variant="h6">
                {project.project.additionalInfo}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Project;
