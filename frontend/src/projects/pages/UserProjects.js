import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import ProjectList from "../components/ProjectList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const UserProjects = () => {
  const auth = useContext(AuthContext);
  const userId = useParams().userId;
  const [loadedProjectsFetch, setLoadedProjectsFetch] = useState([]);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/projects/user/${userId}`,
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
  }, [sendRequest, userId, auth.token]);

  return <ProjectList items={loadedProjectsFetch} />;
};

export default UserProjects;
