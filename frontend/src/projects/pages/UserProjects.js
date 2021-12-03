import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectList from "../components/ProjectList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const DUMMY_PROJECTS = [
  {
    id: "p1",
    name: "Highschool Admission",
    repo: "https://github.com/ovidiuterbea/Admitere-Liceu",
    users: ["u1", "u2"],
  },
  {
    id: "p2",
    name: "SQLite",
    repo: "https://github.com/ovidiuterbea/SQLite",
    users: ["u1", "u2", "u3"],
  },
];

const UserProjects = () => {
  const userId = useParams().userId;
  const [loadedProjectsTest, setLoadedProjectsTest] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/projects/user/${userId}`
        );
        setLoadedProjectsTest(responseData.projects);
        console.log(responseData.projects);
        console.log(loadedProjectsTest);
      } catch (err) {}
    };
    fetchProjects();
  }, [sendRequest, userId]);

  const loadedProjects = DUMMY_PROJECTS.filter((project) =>
    project.users.includes(userId)
  );

  return <ProjectList items={loadedProjects} />;
};

export default UserProjects;
