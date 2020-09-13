import React from 'react';
import './styles/styles.scss';
import About from './components/about';
import { client } from './apolloClient';
import Home from './components/home';
import ProjectAll from './components/project-all';
import Project from './components/project';
import TopNav from './components/topnav';
import { ApolloProvider } from '@apollo/client';


import { Switch, Route, HashRouter } from "react-router-dom";


function App() {
  return (
      <HashRouter>
        <ApolloProvider client={client}>
          <TopNav />

          <Switch>
          <Route path='/:projectName' component={Project} />
          <Route path='/category/:title' component={ProjectAll} />
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
          </Switch>
        </ApolloProvider>

      </HashRouter>
  );
}

export default App;
