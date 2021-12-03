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

const ProjectBugs = (props) => {
  const projectId = useParams().projectId;
  const [loadedBugsFetch, setLoadedBugsFetch] = useState([]);
  const [loadedProjectFetch, setLoadedProjectFetch] = useState();
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/bugs/project/${projectId}`
        );
        setLoadedBugsFetch(responseData.bugs);
      } catch (err) {}
    };
    fetchBugs();
    const fetchProject = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/projects/${projectId}`
        );
        setLoadedProjectFetch(responseData.project);
      } catch (err) {}
    };
    fetchProject();
  }, [sendRequest, projectId]);

  return (
    <li className='project-detail'>
      <div className='project-detail-container'>
        <div className='user-item__info'>
          <h2 id='projectName'>
            {loadedProjectFetch && loadedProjectFetch.name}
          </h2>
        </div>
        <div className='project-item__buttons'>
          <a href={props.repo}>
            <Button id='muibtn' startIcon={<GitHubIcon />}>
              view on github
            </Button>
          </a>
        </div>
      </div>
      {loadedBugsFetch && <BugList items={loadedBugsFetch} />}
    </li>
  );
};

export default ProjectBugs;
