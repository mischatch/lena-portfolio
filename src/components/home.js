import React from 'react';
import { client } from '../apolloClient';
import { gql } from "apollo-boost";
import { Link, withRouter } from "react-router-dom";
import Loading from './loading';
// import Project from './project';
// import ProjectAll from './project-all';

class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      categories: [],
      projects: [],
    }

    this.projects = this.projects.bind(this);
  }

  componentDidMount(){
    client
    .query({
        query: gql`
        {
          projects {
            projectTitle
            
            tileImage {
              url
            }
            tileSize
          }
        }
        `
      })
      .then(result => this.setState({projects: result.data.projects}));

  }


  projects(){
    if(this.state.projects.length > 0){
      const { projects } = this.state;
      return (
        <div className="tiles">
          {projects.map((project, i) => <Link
                to={{
                  pathname: `/${ project.projectTitle.split(' ').join('-') }`,
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
      )
    } else {
      return (
        <Loading />
      );
    }
  }

  render(){
    return (
      <div>
        {this.projects()}
        {/* <ProjectsQuery /> */}
      </div>
    )
  }
}

export default withRouter(Home);
