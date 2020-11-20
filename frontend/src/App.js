import { Router, Switch, Route, Redirect } from "react-router-dom";
import React from 'react';
import Home from './Home';
import history from './history';
import Select from './Select'
import Example from "./Example";
function App() {
  return (
    <div className="App">
      <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/select" exact component={Select} />
                </Switch>
        </Router>
    </div>
  );
}

export default App;
