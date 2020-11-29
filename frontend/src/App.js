import { Router, Switch, Route, Redirect } from "react-router-dom";
import React from 'react';
import Home from './Home';
import history from './history';
import Select from './Select'
import API from './API'
import Final from "./Final";
function App() {
  return (
    <div className="App">
      <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/select" exact component={Select} />
                    <Route path="/final" exact component={Final} />
                    <Route path="/api" exact component={API} />
                </Switch>
        </Router>
    </div>
  );
}

export default App;
