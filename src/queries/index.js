import { gql } from "@apollo/client";

export const GET_PROJECTS_QUERY = gql`
  query getProjects {
    projects(orderBy: id_ASC) {
      id
      projectTitle
      tileImage {
        url
      }
      projectType
      additionalInfo
      fontsInUse
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query Project($id: ID!) {
    project(where: { id: $id }) {
      id
      projectTitle
      projectDescription
      image {
        url
      }
      projectType
      additionalInfo
      fontsInUse
    }
  }
`;

export const GET_INFO = gql`
  query getInfo {
    abouts {
      id
      aboutText
      links {
        ... on Link {
          id
          title
          url
        }
      }
    }
  }
`;

export const GET_FEATURE_FLAGS = gql`
  query getFeatureFlags {
    featureFlags {
      id
      key
      value
    }
  }
`;

export const GET_PROJECTS_BY_CATEGORY = gql`
  query getProjectsByCategory($category: String!) {
    projects(where: { category: $category }) {
      projectTitle
    }
  }
`;
