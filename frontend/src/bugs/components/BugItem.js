import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import "./BugItem.css";

const BugItem = (props) => {
  return (
    <li className='bug-item'>
      <div className='bug-item__description'>
        <h2>{props.description}</h2>
      </div>
      <div className='bug-item__buttons'>
        <a href={props.linkCommit}>
          <Button id='muibtn' startIcon={<GitHubIcon />}>
            View commit on github
          </Button>
        </a>
      </div>
    </li>
  );
};

export default BugItem;
