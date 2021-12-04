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
import ProjectBugs from "./bugs/pages/ProjectBugs";
import BugDetails from "./bugs/pages/BugDetails";
import NewBug from "./bugs/pages/NewBug";
import { useState, useCallback } from "react";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/projects/new' exact>
          <NewProject />
        </Route>
        <Route path='/projects' exact>
          <Projects />
        </Route>
        <Route path='/:userId/projects' exact>
          <UserProjects />
        </Route>
        <Route path='/:userId/projects/:projectId/bugs' exact>
          <ProjectBugs />
        </Route>
        <Route path='/:userId/projects/:projectId/bugs/:bugId' exact>
          <BugDetails />
        </Route>
        <Route path='/:userId/projects/:projectId/newBug' exact>
          <NewBug />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <NavLinks />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
