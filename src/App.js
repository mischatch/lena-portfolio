import React from 'react';
import './styles/styles.scss';
import About from './components/about';
import Home from './components/home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
      <Router>

        <Link to="/">Lena Byalaya</Link>
        <Link to="/about">About</Link>

        <Switch>
          <Route path="/about">
            <About />
          </Route>

           <Route path="/">
             <Home />
           </Route>


        </Switch>
      </Router>
  );
}

export default App;
