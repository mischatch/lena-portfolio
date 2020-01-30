import React from 'react';
import './styles/styles.scss';
import About from './components/about';
import Home from './components/home';
import ProjectAll from './components/project-all';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter
} from "react-router-dom";


function App() {
  return (
      <HashRouter>

        <Link to="/">Lena Byalaya</Link>
        <Link to="/about">About</Link>

        <Switch>
          <Route path='/category/:title' component={ProjectAll} />
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
  );
}

export default App;
