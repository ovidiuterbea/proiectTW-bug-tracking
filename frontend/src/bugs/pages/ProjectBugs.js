import "./ProjectBugs.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@mui/material";
import BugList from "../../bugs/components/BugList";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
// import { Link } from "react-router-dom";
// import BugReportIcon from "@mui/icons-material/BugReport";
// import VisibilityIcon from "@mui/icons-material/Visibility";

const DUMMY_PROJECT = {
  id: "p1",
  name: "Project 1",
  repo: "https://github.com/ovidiuterbea/Admitere-Liceu",
  isTester: false,
  bugs: [
    {
      id: "b1",
      severity: "high",
      priority: 1,
      description: "some generic description",
      linkCommit:
        "https://github.com/ovidiuterbea/Admitere-Liceu/commit/eab8763eecd5d4ea7adac104685eecac266e1227",
      status: "unresolved",
    },
    {
      id: "b2",
      severity: "low",
      priority: 5,
      description: "some generic description part 2",
      linkCommit:
        "https://github.com/ovidiuterbea/Admitere-Liceu/commit/eab8763eecd5d4ea7adac104685eecac266e1227",
      status: "unresolved",
    },
  ],
};

const ProjectDetails = (props) => {
  const projectId = useParams().projectId;
  const [project, setProject] = useState(null);
  const { sendRequest } = useHttpClient();
  console.log("acesta este id-ul din url " + projectId);
  useEffect(() => {
    fetch(`http://localhost:8000/api/projects/${projectId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProject(data);
      });
  }, [sendRequest, projectId]);

  console.log(project);
  console.log(DUMMY_PROJECT);

  return (
    <li className='project-detail'>
      <div className='project-detail-container'>
        <div className='user-item__info'>
          <h2 id='projectName'>{DUMMY_PROJECT.name}</h2>
        </div>
        <div className='project-item__buttons'>
          <a href={props.repo}>
            <Button id='muibtn' startIcon={<GitHubIcon />}>
              view on github
            </Button>
          </a>
        </div>
      </div>
      <BugList items={DUMMY_PROJECT.bugs} />
    </li>
  );
};

export default ProjectDetails;
