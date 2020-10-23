import React from 'react';
import { client } from '../apolloClient';
import { gql } from "apollo-boost";
import Loading from './loading'
import { withRouter } from 'react-router-dom';

class Info extends React.Component {
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
            aboutText,
            links {
              html
            }
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
      const { aboutText, links } = this.state.data[0];
      return (
        <div className="about-page">
          <div className="links" dangerouslySetInnerHTML={{ __html: links[0].html }} />
          <div className="about-copy">
            <p>{aboutText}</p>
          </div>
        </div>
      )
    }
  }
}


export default withRouter(Info);
