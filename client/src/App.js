import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Navbar from './Components/Navbar'
import './App.css';
import Home from './Pages/Home';
import Leaderboards from './Pages/Leaderboards';
import TypeTest from './Pages/TypeTest';

const App = () => {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar/>
          <Home />
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/leaderboards">
          <Navbar/>
          <Leaderboards />
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/typetest">
          <Navbar/>
          <TypeTest/>
        </Route>
      </Switch>

    </Router>

    </>
  );
}

export default App;
