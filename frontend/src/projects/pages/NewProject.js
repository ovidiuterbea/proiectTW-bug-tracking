import React, { useRef } from "react";
import { useState } from "react";
import {
  Card,
  TextField,
  CardContent,
  Grid,
  Button,
  Autocomplete,
} from "@mui/material";

const NewProject = () => {
  const [users, setUsers] = useState([]);
  const selectedUserInputRef = useRef();
  const [enteredProjectName, setEnteredProjectName] = useState("");
  const [enteredRepo, setEnteredRepo] = useState("");

  const projectChangeHandler = (event) => {
    setEnteredProjectName(event.target.value);
  };

  const repoChangeHandler = (event) => {
    setEnteredRepo(event.target.value);
  };

  const usersChangeHandler = () => {
    const enteredUserRef = selectedUserInputRef.current.value;
    setUsers((arr) => [...arr, enteredUserRef]);
    console.log(enteredUserRef);
  };

  const data = [
    { name: "Tudor Delia" },
    { name: "Udris Bogdan" },
    { name: "Terbea Ovidiu" },
  ];

  const formHandler = (event) => {
    event.preventDefault();

    const newProject = {
      name: enteredProjectName,
      repo: enteredRepo,
      users: users,
    };

    setEnteredProjectName("");
    setEnteredRepo("");

    console.log(newProject);
  };

  return (
    <div className='App'>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
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
                    options={data}
                    getOptionLabel={(option) => option.name}
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
                          ref={selectedUserInputRef}
                        />
                      </div>
                    )}
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
  );
};

export default NewProject;
