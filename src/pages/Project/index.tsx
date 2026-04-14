import React, { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "queries";
import { IGetProjectById } from "../../interfaces/get-project.interface";
import { Box, Grid2 as Grid, Typography } from "@mui/material";

type MediaItem =
  | { mediaType: "image"; url: string }
  | { mediaType: "embededVideoCode"; embedCode: string };

function getMediaItems(project: IGetProjectById): MediaItem[] {
  if (project.project.image.length > 0) {
    return project.project.image.map(img => ({
      mediaType: "image" as const,
      url: img.url,
    }));
  }
  return project.project.imageAndVideo.map(item =>
    item.mediaType === "image"
      ? { mediaType: "image" as const, url: item.image.url }
      : { mediaType: "embededVideoCode" as const, embedCode: item.embedCode }
  );
}

const Project: React.FC = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<IGetProjectById | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
  const aspectRatiosRef = useRef<(number | null)[]>([]);

  const { loading, refetch: getProject } = useQuery<IGetProjectById>(
    GET_PROJECT_BY_ID,
    {
      variables: {
        id: projectId,
      },
      skip: !projectId,
    }
  );

  const mediaItems: MediaItem[] = project ? getMediaItems(project) : [];

  const calculateDimensions = useCallback(() => {
    if (!containerRef.current || !slideshowRef.current) return null;

    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    const imageHeight = windowH * 0.75; // 75vh
    const marginX = 50;
    const gutter = 32;

    const ratios = aspectRatiosRef.current;
    if (ratios.length === 0 || ratios.some(r => r === null)) return null;

    let totalWidth = 0;
    (ratios as number[]).forEach((ratio, i) => {
      totalWidth += imageHeight * ratio;
      if (i < ratios.length - 1) totalWidth += gutter;
    });

    totalWidth += marginX * 2;
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
      const ratios = aspectRatiosRef.current as number[];
      const totalItems = ratios.length;

      if (index === 0) return marginX;

      if (index === totalItems - 1) {
        let totalWidth = marginX;
        let lastItemWidth = 0;
        ratios.forEach((ratio, i) => {
          const width = imageHeight * ratio;
          if (i === totalItems - 1) {
            lastItemWidth = width;
          } else {
            totalWidth += width + gutter / 2;
          }
        });
        return windowW - (totalWidth + lastItemWidth + marginX);
      }

      let widthBeforeCurrent = marginX;
      let currentItemWidth = 0;
      for (let i = 0; i <= index; i++) {
        const width = imageHeight * ratios[i];
        if (i === index) {
          currentItemWidth = width;
        } else {
          widthBeforeCurrent += width + gutter;
        }
      }

      return (windowW - currentItemWidth) / 2 - widthBeforeCurrent;
    },
    [calculateDimensions]
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (projectId) {
      const fetchProject = async () => {
        try {
          const { data } = await getProject({ id: projectId });
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

  // Initialise aspect ratios when project loads.
  // Videos get a fixed 16/9 ratio; images start as null until onLoad fires.
  useEffect(() => {
    if (!project) return;
    const items = getMediaItems(project);
    aspectRatiosRef.current = items.map(item =>
      item.mediaType === "embededVideoCode" ? 16 / 9 : null
    );
    if (items.every(item => item.mediaType === "embededVideoCode")) {
      setImagesLoaded(true);
    }
  }, [project]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(prev =>
      prev < mediaItems.length - 1 ? prev + 1 : prev
    );
  }, [mediaItems.length]);

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
            {mediaItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  flex: "none",
                  height: "100%",
                  mr: index < mediaItems.length - 1 ? "1rem" : 0,
                }}
              >
                {item.mediaType === "image" ? (
                  <Box
                    component="img"
                    src={item.url}
                    ref={el => {
                      if (el instanceof HTMLImageElement) {
                        imageRefs.current[index] = el;
                      }
                    }}
                    onLoad={e => {
                      const img = e.currentTarget;
                      aspectRatiosRef.current[index] =
                        img.naturalWidth / img.naturalHeight;
                      const allLoaded = aspectRatiosRef.current.every(
                        r => r !== null
                      );
                      if (allLoaded) setImagesLoaded(true);
                    }}
                    sx={{
                      height: "100%",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      aspectRatio: "16 / 9",
                      "& iframe": { width: "100%", height: "100%", border: "none" },
                    }}
                    dangerouslySetInnerHTML={{ __html: item.embedCode }}
                  />
                )}
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

              {currentImageIndex < mediaItems.length - 1 && (
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
