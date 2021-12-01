import React from "react";

import ProjectList from "../components/ProjectList";

const DUMMY_PROJECTS = [
  {
    id: "p1",
    name: "Project 1",
    repo: "https://github.com/ovidiuterbea/Admitere-Liceu",
    isTester: false,
    bugs: [
      {
        severity: "high",
        priority: 1,
        description: "some generic description",
        linkCommit:
          "https://github.com/ovidiuterbea/Admitere-Liceu/commit/eab8763eecd5d4ea7adac104685eecac266e1227",
        status: "unresolved",
      },
      {
        severity: "low",
        priority: 5,
        description: "some generic description",
        linkCommit:
          "https://github.com/ovidiuterbea/Admitere-Liceu/commit/eab8763eecd5d4ea7adac104685eecac266e1227",
        status: "unresolved",
      },
    ],
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
