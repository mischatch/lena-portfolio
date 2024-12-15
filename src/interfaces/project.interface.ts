export interface IProject {
  id: string;
  projectTitle: string;
  projectDescription: string;
  tileImage: {
    url: string;
  };
  image: {
    url: string;
  }[];
  projectType: string;
  additionalInfo: string;
  fontsInUse: string;
}
