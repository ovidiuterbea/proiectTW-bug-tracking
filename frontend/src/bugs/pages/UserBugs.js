import "./ProjectBugs.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@mui/material";
import BugList from "../../bugs/components/BugList";
import { useParams } from "react-router";
import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const UserBugs = (props) => {
  const auth = useContext(AuthContext);
  const userId = useParams().userId;
  const [loadedBugsFetch, setLoadedBugsFetch] = useState([]);
  const { sendRequest, isLoading } = useHttpClient();
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/bugs/user/${userId}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setLoadedBugsFetch(responseData.bugs);
      } catch (err) {}
    };
    fetchBugs();
  }, [sendRequest, auth.token, userId]);

  return (
    <React.Fragment>
      <Stack alignItems='center'>
        {isLoading && (
          <CircularProgress size={100} style={{ marginTop: "2rem" }} />
        )}
      </Stack>
      <li className='project-detail'>
        <div className='project-detail-container'>
          <div className='user-item__info'></div>
          <div className='project-item__buttons'>
            <a href={props.repo}>
              <Button id='muibtn' startIcon={<GitHubIcon />}>
                view on github
              </Button>
            </a>
          </div>
        </div>
        {loadedBugsFetch && !isLoading && <BugList items={loadedBugsFetch} />}
      </li>
    </React.Fragment>
  );
};

export default UserBugs;
