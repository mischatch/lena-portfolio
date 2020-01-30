import React from 'react';
import { client } from '../apolloClient';
import { gql } from "apollo-boost";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ProjectAll from './project-all';

class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      categories: []
    }

    this.categories = this.categories.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    client
    .query({
        query: gql`
        {
          homepageSections {
            title
            category
          }
        }
        `
      })
      .then(result => this.setState({categories: result.data.homepageSections}));
      // .then(result => console.log(result.data.homepageSections));
  }

  // handleClick(location){
  //   // debugger
  //   return <ProjectAll cat={location} />
  // }

  categories(){
    if(this.state.categories.length > 0){
      const cats = this.state.categories;
      return (
        <div className="tiles">
            {cats.map((item, i) => {
              return(
                  <div key={`tile${i}`} className="tile">
                    <Link to={`/category/${item.category}`}>
                      <h1>{item.title}</h1>
                    </Link>
                  </div>
                )
              })
            }
          </div>
          //   <Router>
          //     <Switch>
          //   {cats.map((item, i) => {
          //     return(
          //           <Route to={`/category/${item.category}`}>
          //             <ProjectAll cat={item.category} />
          //           </Route>
          //     )
          //   })}
          // </Switch>
          // </Router>

      )
    } else {
      return (<div>Loading</div>);
    }
  }

  render(){
    return (
      <div>
        <h1 className="home-header">Homepage</h1>
          {this.categories()}
      </div>
    )
  }
}

export default Home;
