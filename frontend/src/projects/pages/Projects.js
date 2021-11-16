import React from "react";

import ProjectList from "../components/ProjectList";

const DUMMY_PROJECTS = [
  {
    id: "p1",
    name: "Project 1",
    repo: "https://github.com/ovidiuterbea/Admitere-Liceu",
    isTester: false,
  },
  {
    id: "p2",
    name: "Project 2",
    repo: "https://github.com/ovidiuterbea/Admitere-Liceu",
    isTester: true,
  },
];

const Projects = () => {
  return <ProjectList items={DUMMY_PROJECTS} />;
};

export default Projects;
