import React from 'react';
import Loading from './loading'
import { useQuery } from '@apollo/client';
import { GET_INFO } from './queries';

export default function Info(){
  const {loading, error, data} = useQuery(GET_INFO);
  
  if(loading || data === undefined){
    return <Loading />;
  }
  
  if(error){
    return <p>Error: {error}</p>
  }
  
  const { aboutText, links } = data.abouts[0];

  return (
    <div className="about-page">
      <div className="links" dangerouslySetInnerHTML={{ __html: links[0].html }} />
      <div className="about-copy">
        <p>{aboutText}</p>
      </div>
    </div>
  )

}
