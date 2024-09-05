import {gql} from '@apollo/client';

export const GET_PROJECTS_QUERY = gql`
  query getProjects {
    projects(orderBy: order_ASC) {
      projectTitle
      shortDescription
      tileImage {
        url
      }
      tileSize
      order
    }
  }
`;

export const GET_INFO = gql`
  query getInfo {
    abouts {
      id,
      aboutText,
      links {
        html
      }
    }
  }
`;

export const GET_FEATURE_FLAGS = gql`
  query getFeatureFlags {
    featureFlags {
      id,
      key,
      value
    }
  }
`