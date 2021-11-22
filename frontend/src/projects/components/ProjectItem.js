import React from "react";
import "./ProjectItem.css";
// import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from "@mui/material";

const ProjectItem = (props) => {
  return (
    <li className='project-item'>
      <div className='user-item__info'>
        <h2 id="projectName">{props.name}</h2>
      </div>
      <div className='project-item__buttons'>
        <a href={props.repo}>
          <Button id="muibtn" startIcon={<GitHubIcon/>}>view on github</Button>
          {/* <button><GitHubIcon/> view on github</button> */}
        </a>
        {props.isTester && (
          // <Link>
          <Button id="muibtn" startIcon={<BugReportIcon/>}>add bug</Button>
          // <button>Buton catre creeare bug</button>
          // </Link>
        )}
        {!props.isTester && (
          // <Link>
          <Button id="muibtn" startIcon={<VisibilityIcon/>}>view project details</Button>
          // <button>Buton catre vizualizare proiect</button>
          // </Link>
        )}
      </div>
    </li>
  );
};

export default ProjectItem;
