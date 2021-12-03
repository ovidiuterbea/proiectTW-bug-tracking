import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectList from "../components/ProjectList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserProjects = () => {
  const userId = useParams().userId;
  const [loadedProjectsFetch, setLoadedProjectsFetch] = useState([]);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/projects/user/${userId}`
        );
        setLoadedProjectsFetch(responseData.projects);
      } catch (err) {}
    };
    fetchProjects();
  }, [sendRequest, userId]);

  let loadedProjects = loadedProjectsFetch;

  return <ProjectList items={loadedProjects} />;
};

export default UserProjects;
