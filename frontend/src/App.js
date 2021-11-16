import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Auth from "./users/pages/Auth";
import NewProject from "./projects/pages/NewProject";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Auth />
        </Route>
        <Route path='/project/new' exact>
          <NewProject />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
