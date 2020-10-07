import React from 'react';
import { client } from '../apolloClient';
import { gql } from "apollo-boost";
import Loading from './loading'

class About extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount(){
    client
    .query({
        query: gql`
        {
          abouts {
            id,
            aboutText
          }
        }
        `
      })
      .then(result => {

        this.setState({data: result.data.abouts});
      });
  }

  render(){
    const { data } = this.state;
    if(data.length === 0){
      return <Loading />;
    } else {
      return (
        <div className="about-page">
          {data.map((val, i) => <p key={`aboutText${i}`}>{val.aboutText}</p>)}
        </div>
      )
    }
  }
}


export default About;
