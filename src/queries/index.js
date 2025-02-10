import { gql } from "@apollo/client";

export const GET_PROJECTS_QUERY = gql`
  query getProjects {
    projects(orderBy: createdAt_DESC) {
      id
      projectTitle
      tileTitle
      tileImage {
        url
      }
      projectType
      additionalInfo
      fontsInUse
      createdAt
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
      createdAt
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
      titledList {
        ... on YearLinksWithTitle {
          id
          title
          linkItem {
            ... on YearLink {
              id
              linkName
              linkUrl
              type
              year
            }
          }
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
