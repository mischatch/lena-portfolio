export interface IProject {
  id: string;
  projectTitle: string;
  tileTitle: string;
  projectDescription: string;
  tileImage: {
    url: string;
  };
  image: {
    url: string;
  }[];
  imageAndVideo: {
    embedCode: string;
    image: {
      url: string;
    };
    mediaType: "image" | "embededVideoCode";
  }[];
  projectType: string;
  additionalInfo: string;
  fontsInUse: string;
  createdAt: string;
}
