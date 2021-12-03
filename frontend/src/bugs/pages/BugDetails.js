import "./BugDetails.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

const BugDetails = (props) => {
  const bugId = useParams().bugId;
  const [loadedBugFetch, setLoadedBugFetch] = useState();
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchBug = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/bugs/bug/${bugId}`
        );
        setLoadedBugFetch(responseData.bug);
      } catch (err) {}
    };
    fetchBug();
  }, [sendRequest, bugId]);
  console.log(loadedBugFetch);
  return (
    <div className='bug-detail'>
      <div className='center'>
        <h2 className='bug-title'>Bug Details</h2>
      </div>
      <h3 className='bug-text-margin'>Priority: {loadedBugFetch.priority}</h3>
      <h3 className='bug-text-margin'>
        Severity Level: {loadedBugFetch.severity}{" "}
      </h3>
      <h3 className='bug-text-margin'>
        Description: {loadedBugFetch.description}
      </h3>
      <h3 className='bug-text-margin'>Status: {loadedBugFetch.status} </h3>
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
