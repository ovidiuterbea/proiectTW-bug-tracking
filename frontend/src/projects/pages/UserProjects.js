import React from "react";
import { useParams } from "react-router-dom";

import ProjectList from "../components/ProjectList";

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
  const loadedProjects = DUMMY_PROJECTS.filter((project) =>
    project.users.includes(userId)
  );

  return <ProjectList items={loadedProjects} />;
};

export default UserProjects;
