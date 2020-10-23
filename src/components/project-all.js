import React from 'react';
import { client } from '../apolloClient';
import { gql } from "apollo-boost";
import { withRouter } from 'react-router-dom';

class ProjectAll extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      category: '',
      projects: []
    }

    this.projectRender = this.projectRender.bind(this);
  }

  componentDidMount(){
    const cat = this.props.match.url.split('/').reverse()[0];
    this.setState({category: cat});

    client
    .query({
        query: gql`
        {
          projects(where: {category: ${cat}}) {
            projectTitle
          }
        }
        `
      })
      .then(result => {
        // console.log(result.data.projects);
        this.setState({projects: result.data.projects});
      });
  }

  projectRender(){
    if(this.state.projects.length > 0){
      const projects = this.state.projects;
      return (
        <div className='projects'>
          {projects.map((item, i) => {
            return (
              <h1 key={i}>{item.projectTitle}</h1>
            )
          })}
        </div>
      )
    }
  }

  render(){
    return (
      <div>
        <h1>{this.state.category}</h1>
        {this.projectRender()}
      </div>
    )
  }
}

export default withRouter(ProjectAll);
