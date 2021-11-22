import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Auth from "./users/pages/Auth";
import NewProject from "./projects/pages/NewProject";
import Projects from "./projects/pages/Projects";
import UserProjects from "./projects/pages/UserProjects";

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
        <Route path='/projects' exact>
          <Projects />
        </Route>
        <Route path='/:userId/projects' exact>
          <UserProjects />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
