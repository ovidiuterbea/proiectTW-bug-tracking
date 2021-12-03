import React, { useEffect, useState } from "react";

import ProjectList from "../components/ProjectList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Projects = () => {
  const [loadedProjectsFetch, setLoadedProjectsFetch] = useState([]);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/projects/`
        );
        setLoadedProjectsFetch(responseData.projects);
      } catch (err) {}
    };
    fetchProjects();
  }, [sendRequest]);

  return <ProjectList items={loadedProjectsFetch} />;
};

export default Projects;
