import React from 'react';
import './styles/styles.scss';
import Info from './components/info';
import { client } from './apolloClient';
import Home from './components/home';
import ProjectAll from './components/project-all';
import Project from './components/project';
import TopNav from './components/topnav';
import NoMatch from './components/nomatch';
import Footer from './components/footer';
import { ApolloProvider } from '@apollo/client';


import { Switch, Route } from "react-router-dom";


function App() {
  return (

        <ApolloProvider client={client}>
          <TopNav />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/info" component={Info} />
            <Route path='/category/:title' component={ProjectAll} />
            <Route exact path='/project/:projectName' component={Project} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </ApolloProvider>


  );
}

export default App;
