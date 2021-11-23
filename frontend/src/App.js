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
import NavLinks from "./shared/components/Navigation/NavLinks";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavLinks />
        <Switch>
          <Route path='/' exact>
            <Auth />
          </Route>
          <Route path='/projects/new' exact>
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
    </React.Fragment>
  );
}

export default App;
