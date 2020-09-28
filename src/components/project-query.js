import React, { useState } from 'react';
import Loading from './loading';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
// import { client } from '../apolloClient';
// import { gql } from "apollo-boost";

const projectQry = gql`
  query Project($projectTitle: String!) {
    project(where: {projectTitle: $projectTitle}) {
      projectTitle
      projectDescription
      shortDescription
      image {
        url
      }
    }
  }
`


const ProjectQuery = ({ projectId }) => {
  const [active, setActive] = useState(false);
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
        <div className="images">
          {project.image.map((image, i) => <img
            alt=""
            key={`image-${i}`}
            src={image.url}
            className="image-container"
          />)}
          </div>
        <div className={`project-copy ${active ? 'active' : ''}`}>
          <h1 className="title">{project.projectTitle}   <span className={`show-button ${active ? 'active' : ''}`} onClick={() => active ? setActive(false) : setActive(true)}>{active ? 'show less' : 'show more'}</span></h1>
          <p className="description">{!!project.projectDescription ?
            project.projectDescription
              :
            project.shortDescription }</p>
        </div>
      </div>
    )
  }
}

export default ProjectQuery;
