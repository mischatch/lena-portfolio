import React from 'react';
import Loading from './loading';
import { useQuery, gql } from '@apollo/client';
// import { client } from '../apolloClient';
// import { gql } from "apollo-boost";

const projectQry = gql`
  query Project($projectTitle: String!) {
    project(where: {projectTitle: $projectTitle}) {
      projectTitle
      projectDescription

    }
  }
`


const ProjectQuery = ({ projectId }) => {
  const params = {
    variables: {
      projectTitle: projectId.split('-').join(' ')
    }
  }
  const { loading, error, data } = useQuery(projectQry, params);
  if(loading){
    return (
      <div className="project">
        <Loading />
      </div>
    )
  } else if(error){
    return (
      <div className="project">
        <h2>Something went wrong!</h2>

        <p>{error.message}</p>
      </div>
    )
  } else if(Object.keys(data.project).length > 0) {
    const { project } = data;
    return (
      <div className="project">
        {project.projectTitle}
        {project.projectDescription}
      </div>
    )
  }
}

export default ProjectQuery;
