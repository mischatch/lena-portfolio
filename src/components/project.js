import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectQuery from './project-query';
import Loading from './loading';

class Project extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      projectId: ''
    }
  }
  componentDidMount(){
    let projectId = '';
    if(!!this.props.location.state){
      projectId = this.props.location.state.projectId;
    } else {
      projectId = this.props.location.pathname.slice(1);
    }
    this.setState({ projectId: projectId });
  }

  render(){
    const projectId = this.state;

    return (
      <div className="">
        { !!projectId ? <ProjectQuery projectId={this.state.projectId} /> : <Loading /> }
      </div>
    )
  }
}

export default withRouter(Project);
