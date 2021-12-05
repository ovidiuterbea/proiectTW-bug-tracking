import React from "react";
import "./ProjectItem.css";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";

const ProjectItem = (props) => {
  const auth = useContext(AuthContext);
  return (
    <li className='project-item'>
      <div className='user-item__info'>
        <h2 id='projectName'>{props.name}</h2>
      </div>
      <div className='project-item__buttons'>
        <a href={props.repo}>
          <Button id='muibtn' startIcon={<GitHubIcon />}>
            View on github
          </Button>
        </a>
        {props.isTester && (
          <Link to={`/${auth.userId}/projects/${props.id}/newBug`}>
            <Button id='muibtn' startIcon={<BugReportIcon />}>
              Add bug
            </Button>
          </Link>
        )}
        {!props.isTester && (
          <Link to={`/${auth.userId}/projects/${props.id}/bugs`}>
            <Button id='muibtn' startIcon={<VisibilityIcon />}>
              View project details
            </Button>
          </Link>
        )}
      </div>
    </li>
  );
};

export default ProjectItem;
