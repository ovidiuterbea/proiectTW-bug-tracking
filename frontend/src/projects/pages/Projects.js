import React, { useEffect, useState, useContext } from "react";

import ProjectList from "../components/ProjectList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Projects = () => {
  const auth = useContext(AuthContext);
  const [loadedProjectsFetch, setLoadedProjectsFetch] = useState([]);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/projects/`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setLoadedProjectsFetch(responseData.projects);
      } catch (err) {}
    };
    fetchProjects();
  }, [sendRequest, auth.token]);

  return <ProjectList items={loadedProjectsFetch} />;
};

export default Projects;
