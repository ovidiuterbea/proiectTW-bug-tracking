import "./BugDetails.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";
import React from "react";

const BugDetails = (props) => {
  return (
    <div className='bug-detail'>
      <div className='center'>
        <h2 className='bug-title'>Bug Detail</h2>
      </div>
      <h3 className='bug-text-margin'>Priority: High</h3>
      <h3 className='bug-text-margin'>Severity Level: 4 </h3>
      <h3 className='bug-text-margin'>
        Description: Some idiot forgot to resolve the conflict between different
        commits and the manager is going to nuke us, God help us all.
      </h3>
      <h3 className='bug-text-margin'>Status: Unresolved </h3>
      <h3 className='bug-text-margin'>
        Person who is working on the bug: Tudor Delia{" "}
      </h3>
      <div className='project-item__buttons'>
        <a href={props.repo}>
          <Button id='muibtn' startIcon={<GitHubIcon />}>
            View Commit on Github
          </Button>
        </a>
        <a href={props.repo}>
          <Button id='muibtn' startIcon={<DoneIcon />}>
            Resolve the bug
          </Button>
        </a>
      </div>
    </div>
  );
};

export default BugDetails;
