import React from 'react';
import Loading from './loading';
import { useQuery, gql } from '@apollo/client';

const projectQry = gql`
  query Projects(){
    projects{
      id
      projectTitle
      tileImage
      tileSize
    }
  }
`

const ProjectsQuery = ({ projectId }) => {
  const params = {
    variables: {
      id: projectId
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
      </div>
    )
  } else if(data.projects.length > 0) {
    const { projects } = data;
    return (
      <div className="project">
        this is project
      </div>
    )
  }
}

export default ProjectsQuery;
