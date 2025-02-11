import React, { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "queries";
import { IGetProjectById } from "../../interfaces/get-project.interface";
import { Box, Grid2 as Grid, Typography } from "@mui/material";

const Project: React.FC = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<IGetProjectById | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);

  const { loading, refetch: getProject } = useQuery<IGetProjectById>(
    GET_PROJECT_BY_ID,
    {
      variables: {
        id: projectId,
      },
      skip: !projectId,
    }
  );

  const calculateDimensions = useCallback(() => {
    if (!containerRef.current || !slideshowRef.current) return null;

    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    const imageHeight = windowH * 0.75; // 75vh
    const marginX = 50; // Fixed margin in pixels
    const gutter = 32; // Fixed gutter in pixels

    // Calculate total content width including gutters
    const images = slideshowRef.current.querySelectorAll("img");
    let totalWidth = 0;
    images.forEach((img, i) => {
      const ratio = img.naturalWidth / img.naturalHeight;
      const computedWidth = imageHeight * ratio;
      totalWidth += computedWidth;
      if (i < images.length - 1) totalWidth += gutter;
    });

    totalWidth += marginX * 2; // Add left and right margins
    const needsNavigation = totalWidth > windowW;

    return {
      windowW,
      windowH,
      imageHeight,
      marginX,
      gutter,
      totalWidth,
      needsNavigation,
    };
  }, []);

  const calculateSlidePosition = useCallback(
    (index: number) => {
      if (!containerRef.current || !slideshowRef.current) return 0;
      const dimensions = calculateDimensions();
      if (!dimensions) return 0;

      const { windowW, imageHeight, marginX, gutter } = dimensions;
      const images = Array.from(slideshowRef.current.querySelectorAll("img"));
      const totalImages = images.length;

      // Handle first image
      if (index === 0) {
        return marginX; // Start position with left margin
      }

      // Handle last image
      if (index === totalImages - 1) {
        let totalWidth = marginX; // Start with left margin
        let lastImageWidth = 0;

        images.forEach((img, i) => {
          const ratio = img.naturalWidth / img.naturalHeight;
          const width = imageHeight * ratio;
          if (i === totalImages - 1) {
            lastImageWidth = width;
          } else {
            totalWidth += width + gutter / 2;
          }
        });

        // Calculate position that will place the last image marginX pixels from the right edge
        return windowW - (totalWidth + lastImageWidth + marginX);
      }

      // Calculate position for center alignment
      let widthBeforeCurrent = marginX;
      let currentImageWidth = 0;

      for (let i = 0; i <= index; i++) {
        const img = images[i];
        const ratio = img.naturalWidth / img.naturalHeight;
        const width = imageHeight * ratio;

        if (i === index) {
          currentImageWidth = width;
        } else {
          widthBeforeCurrent += width + gutter;
        }
      }

      // Center the current image
      const centerPosition = (windowW - currentImageWidth) / 2;
      return centerPosition - widthBeforeCurrent;
    },
    [calculateDimensions]
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

  useEffect(() => {
    if (project?.project.image) {
      const allImagesLoaded = imageRefs.current.every(img => img?.complete);
      if (allImagesLoaded) {
        setImagesLoaded(true);
      }
    }
  }, [project]);

  const handleNextImage = useCallback(() => {
    if (!project?.project.image) return;
    setCurrentImageIndex(prev =>
      prev < project.project.image.length - 1 ? prev + 1 : prev
    );
  }, [project?.project.image]);

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNextImage]);

  useEffect(() => {
    const handleResize = () => {
      if (slideshowRef.current) {
        const position = calculateSlidePosition(currentImageIndex);
        slideshowRef.current.style.transform = `translateX(${position}px)`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateSlidePosition, currentImageIndex]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>No project found</div>;

  const dimensions = calculateDimensions();

  return (
    <Box sx={{ width: "100%", padding: "0 0 2rem 0" }}>
      <Box sx={{ width: "100%" }}>
        <Box
          ref={containerRef}
          sx={{
            position: "relative",
            width: "100%",
            mb: "0.5rem",
            height: "80vh",
            overflow: "hidden",
          }}
        >
          <Box
            ref={slideshowRef}
            sx={{
              display: "flex",
              height: "100%",
              position: "relative",
              transform: `translateX(${calculateSlidePosition(currentImageIndex)}px)`,
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {project.project.image.map((image, index) => (
              <Box
                key={`${image.url}-${index}`}
                sx={{
                  flex: "none",
                  height: "100%",
                  mr: index < project.project.image.length - 1 ? "1rem" : 0,
                }}
              >
                <Box
                  component="img"
                  src={image.url}
                  ref={el => {
                    if (el instanceof HTMLImageElement) {
                      imageRefs.current[index] = el;
                    }
                  }}
                  onLoad={() => {
                    if (index === project.project.image.length - 1) {
                      setImagesLoaded(true);
                    }
                  }}
                  sx={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
          </Box>

          {imagesLoaded && dimensions?.needsNavigation && (
            <>
              {currentImageIndex > 0 && (
                <Box
                  onMouseEnter={e => {
                    e.currentTarget.style.cursor = "pointer";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.cursor = "default";
                  }}
                  onClick={handlePrevImage}
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "50%",
                    zIndex: 2,
                  }}
                />
              )}

              {currentImageIndex < project.project.image.length - 1 && (
                <Box
                  onMouseEnter={e => {
                    e.currentTarget.style.cursor = "pointer";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.cursor = "default";
                  }}
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "50%",
                    zIndex: 2,
                  }}
                />
              )}
            </>
          )}
        </Box>

        <Grid container spacing={2} sx={{ px: "3.125rem" }}>
          <Grid size={4.5}>
            <Typography variant="h5">{project.project.projectTitle}</Typography>
            <Typography sx={{ mt: 1 }}>
              {project.project.projectDescription}
            </Typography>
          </Grid>

          <Grid size={3} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{project.project.projectType}</Typography>
          </Grid>

          <Grid size={1.5} sx={{ textAlign: "right" }}>
            {project.project.fontsInUse && (
              <Typography variant="h6">
                fonts in use: <br />
                {project.project.fontsInUse}
              </Typography>
            )}
          </Grid>

          <Grid size={1.5} />

          <Grid size={1.5} sx={{ textAlign: "right" }}>
            {project.project.additionalInfo && (
              <Typography variant="h6">
                {project.project.additionalInfo}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Project;
