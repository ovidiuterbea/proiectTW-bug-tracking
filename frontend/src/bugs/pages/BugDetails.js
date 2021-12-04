import "./BugDetails.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const BugDetails = (props) => {
  const auth = useContext(AuthContext);
  const bugId = useParams().bugId;
  const [loadedBugFetch, setLoadedBugFetch] = useState();
  const [loadedUserFetch, setLoadedUserFetch] = useState();
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const { sendRequest, isLoading } = useHttpClient();
  useEffect(() => {
    const fetchBug = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/bugs/bug/${bugId}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setLoadedBugFetch(responseData.bug);
        setStatus(responseData.bug.status);
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
  }, [sendRequest, bugId, userId, auth.token]);

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
          Authorization: `Bearer ${auth.token}`,
        }
      );
    } catch (err) {}
  };

  const bugDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:8000/api/bugs/bug/${bugId}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Stack alignItems='center'>
        {isLoading && (
          <CircularProgress size={100} style={{ marginTop: "2rem" }} />
        )}
      </Stack>
      {!isLoading && (
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
            {userId === auth.userId && status === "UNRESOLVED" && (
              <Button
                id='muibtn'
                startIcon={<DoneIcon />}
                onClick={bugStatusUpdateHandler}
                style={{ margin: "1rem" }}
              >
                Resolve the bug
              </Button>
            )}
            {status === "RESOLVED" && (
              <Button
                id='muibtn'
                startIcon={<DoneIcon />}
                onClick={bugDeleteHandler}
                style={{ margin: "1rem" }}
              >
                Delete the bug
              </Button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BugDetails;
