import React from 'react';
import { client } from '../apolloClient';
import { gql } from "apollo-boost";

class About extends React.Component {

  componentDidMount(){
    client
    .query({
        query: gql`
        {
          abouts {
            aboutText
          }
        }
        `
      })
      .then(result => console.log(result.data.abouts[0]));
  }

  render(){
    return (
      <div>
        <h1>React works</h1>
      </div>
    )
  }
}


export default About;
