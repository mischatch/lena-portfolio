import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import Loading from './loading';
import {GET_FEATURE_FLAGS, GET_PROJECTS_QUERY} from './queries/index';
import { useEffect } from 'react';

export default function Home(){
  const [data, setData] = useState();
  const {loading, error, refetch: fetchProjects} = useQuery(GET_PROJECTS_QUERY);
  const {loading: ffLoading, data: featureFlags } = useQuery(GET_FEATURE_FLAGS);

  useEffect(() => {
    if(featureFlags){
      const { value } = featureFlags.featureFlags[0];
      if(!ffLoading && !value){
        async function getData(){
          const fetchedData = await fetchProjects();
          setData(fetchedData.data);
        }
        getData();
      }
    }
  }, [fetchProjects, ffLoading, featureFlags])
 
  if(loading || ffLoading || featureFlags === undefined){
    return (
      <Loading />
    );
  }

  if(error){
    return <p>Error: {error}</p>
  }

  if(featureFlags.featureFlags[0].value){
    return (
      <div className='maintenance'>
        Site is Under Maintenance!
      </div>
    )
  }
  
  return (
    <div className="home">
       <div className="tiles">
          {data.projects.map((project, i) => <Link
                to={{
                  pathname: `/project/${ project.projectTitle.split(' ').join('-') }`,
                  state: {projectId: project.projectTitle.split(' ').join('-')}
                }}
                className={`project-tile ${project.tileSize}`}
                key={`tile${i}`}>
                <div className="cover-image" style={{ 'backgroundImage': `url(${!!project.tileImage.url ? project.tileImage.url : ''})`}}>
                  <h1 className="title">{project.projectTitle}</h1>
                </div>
              </Link>
            )
          }
        </div>
      <div className="fake-footer"><h1>elenabyalaya</h1></div>
    </div>
  )
}
