import React from "react";
import { useState } from "react";
import {
  Card,
  TextField,
  CardContent,
  Grid,
  Button,
  Autocomplete,
  Typography,
} from "@mui/material";
import { useEffect, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { AuthContext } from "../../shared/context/auth-context";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const NewProject = () => {
  const auth = useContext(AuthContext);
  const [usersId, setUsersId] = useState([]);
  const [enteredUser, setEnteredUser] = useState("");
  const [enteredProjectName, setEnteredProjectName] = useState("");
  const [enteredRepo, setEnteredRepo] = useState("");
  const { sendRequest, isLoading } = useHttpClient();
  const [loadedUsersFetch, setLoadedUsersFetch] = useState([]);
  const [userId, setUserId] = useState("");
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [userWasAdded, setUserWasAdded] = useState(false);
  const [userNames, setUserNames] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/users/`
        );
        setLoadedUsersFetch(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const handleClose = () => {
    setOpen(false);
  };

  const projectChangeHandler = (event) => {
    setEnteredProjectName(event.target.value);
  };

  const repoChangeHandler = (event) => {
    setEnteredRepo(event.target.value);
  };

  const enteredUserChangeHandler = (event) => {
    setEnteredUser(event.target.value);
  };

  const usersChangeHandler = (event) => {
    let user = loadedUsersFetch.filter(
      (loadedUser) => loadedUser.id === userId
    );
    if (!usersId.includes(userId)) {
      setUsersId((arr) => [...arr, userId]);
      setOpen(true);
      setUserWasAdded(true);
    }
    if (!userNames.includes(user[0].name && user[0].surname)) {
      setUserNames(userNames + " " + user[0].name + " " + user[0].surname);
    }
  };

  const formHandler = async (event) => {
    event.preventDefault();

    const newProject = {
      name: enteredProjectName,
      repo: enteredRepo,
      users: usersId,
    };

    try {
      await sendRequest(
        "http://localhost:8000/api/projects",
        "POST",
        JSON.stringify({
          name: enteredProjectName,
          repo: enteredRepo,
          users: usersId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
    } catch (err) {}

    setEnteredProjectName("");
    setEnteredRepo("");
    setEnteredUser("");

    history.push("/" + auth.userId + "/projects");
  };

  return (
    <React.Fragment>
      <Stack alignItems='center'>
        {isLoading && (
          <CircularProgress size={100} style={{ marginTop: "2rem" }} />
        )}
      </Stack>
      {open && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              {enteredUser} has been added to the project
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      )}
      {!isLoading && (
        <div className='App'>
          <Typography
            padding='1rem'
            variant='h3'
            align='center'
            color='#f3f3f3'
          >
            Add Project
          </Typography>
          <Grid>
            <Card
              style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
            >
              <CardContent>
                <form onSubmit={formHandler}>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <TextField
                        placeholder='Enter project name'
                        label='Project Name'
                        variant='outlined'
                        fullWidth
                        required
                        onChange={projectChangeHandler}
                        value={enteredProjectName}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        placeholder='Enter repository link'
                        label='Repository'
                        variant='outlined'
                        fullWidth
                        required
                        onChange={repoChangeHandler}
                        value={enteredRepo}
                      />
                    </Grid>
                    <Grid xs={12} sm={8} item>
                      <Autocomplete
                        id='combo-box-existent-users'
                        options={loadedUsersFetch}
                        getOptionLabel={(option) =>
                          option.name + " " + option.surname
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref}>
                            <TextField
                              inputProps={{ ...params.inputProps }}
                              placeholder='Select users for this project'
                              label='Users'
                              variant='outlined'
                              fullWidth
                              onBlur={enteredUserChangeHandler}
                              value={enteredUser}
                            />
                          </div>
                        )}
                        onChange={(event, newValue) => {
                          if (newValue !== null) {
                            setUserId(newValue.id);
                          }
                        }}
                      />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Button
                        type='button'
                        variant='contained'
                        color='primary'
                        fullWidth
                        onClick={usersChangeHandler}
                      >
                        Add user
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant='p'
                        align='center'
                        // color='#f3f3f3'
                      >
                        User currently added :{!userWasAdded && " None"}{" "}
                        {userWasAdded && userNames}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
};

export default NewProject;
