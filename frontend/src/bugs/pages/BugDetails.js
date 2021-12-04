import "./BugDetails.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const BugDetails = (props) => {
  const auth = useContext(AuthContext);
  const bugId = useParams().bugId;
  const [loadedBugFetch, setLoadedBugFetch] = useState();
  const [loadedUserFetch, setLoadedUserFetch] = useState();
  const [userId, setUserId] = useState("");
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchBug = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/bugs/bug/${bugId}`
        );
        setLoadedBugFetch(responseData.bug);
        setUserId(responseData.bug.user);
      } catch (err) {}
    };
    const fetchUser = async () => {
      try {
        if (userId) {
          const responseData = await sendRequest(
            `http://localhost:8000/api/users/${userId}`
          );
          setLoadedUserFetch(responseData.user);
        }
      } catch (err) {}
    };

    fetchBug();
    fetchUser();
  }, [sendRequest, bugId, userId]);

  const bugStatusUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:8000/api/bugs/bug/${bugId}`,
        "PATCH",
        JSON.stringify({
          status: "RESOLVED",
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  return (
    <div className='bug-detail'>
      <div className='center'>
        <h2 className='bug-title'>Bug Details</h2>
      </div>
      <h3 className='bug-text-margin'>
        Priority: {loadedBugFetch && loadedBugFetch.priority}
      </h3>
      <h3 className='bug-text-margin'>
        Severity Level: {loadedBugFetch && loadedBugFetch.severity}
      </h3>
      <h3 className='bug-text-margin'>
        Description: {loadedBugFetch && loadedBugFetch.description}
      </h3>
      <h3 className='bug-text-margin'>
        Status: {loadedBugFetch && loadedBugFetch.status}
      </h3>
      <h3 className='bug-text-margin'>
        Person who is working on the bug:
        {loadedUserFetch &&
          " " + loadedUserFetch.name + " " + loadedUserFetch.surname}
      </h3>
      <div className='project-item__buttons'>
        <a href={props.repo}>
          <Button id='muibtn' startIcon={<GitHubIcon />}>
            View Commit on Github
          </Button>
        </a>
        {userId === auth.userId && (
          <a href={props.repo}>
            <Button
              id='muibtn'
              startIcon={<DoneIcon />}
              onClick={bugStatusUpdateHandler}
            >
              Resolve the bug
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default BugDetails;
