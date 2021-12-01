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
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const NewBug = () => {
  //Bug: severity, priority, description, linkCommit, projectId, status: false (unresolved), userAlocat
  //projectId, status, userAlocat

  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredCommit, setEnteredCommit] = useState("");
  const [enteredSeverity, setEnteredSeverity] = useState("");
  const [enteredPriority, setEnteredPriority] = useState("");
  const [enteredAlocUser, setEnteredAlocUser] = useState("");

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const commitChangeHandler = (event) => {
    setEnteredCommit(event.target.value);
  };

  const severityChangeHandler = (event) => {
    setEnteredSeverity(event.target.value);
  };

  const priorityChangeHandler = (event) => {
    setEnteredPriority(event.target.value);
  };

  const enteredAlocUserHandler = (event) => {
    setEnteredAlocUser(event.target.value);
  };

  const formHandler = (event) => {
    event.preventDefault();

    const newBug = {
      description: enteredDescription,
      commit: enteredCommit,
      severity: enteredSeverity,
      priority: enteredPriority,
      alocUser: enteredAlocUser,
    };

    console.log(newBug);
  };

  const data = [
    { name: "Tudor Delia" },
    { name: "Udris Bogdan" },
    { name: "Terbea Ovidiu" },
  ];

  return (
    <div className='App'>
      <Typography padding='1rem' variant='h3' align='center' color='#f3f3f3'>
        Add Bug
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <form onSubmit={formHandler}>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    placeholder='Enter bug description'
                    label='Bug Description'
                    variant='outlined'
                    fullWidth
                    required
                    onChange={descriptionChangeHandler}
                    value={enteredDescription}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    placeholder='Enter commit link'
                    label='Commit link'
                    variant='outlined'
                    fullWidth
                    required
                    onChange={commitChangeHandler}
                    value={enteredCommit}
                  />
                </Grid>
                <Grid xs={12} item>
                  <FormControl fullWidth>
                    <InputLabel id='selectPriorityLabel'>Priority</InputLabel>
                    <Select
                      labelId='selectPriorityLabel'
                      id='selectPriority'
                      label='Priority'
                      onChange={priorityChangeHandler}
                      value={enteredPriority}
                      fullWidth
                      variant='outlined'
                      required
                    >
                      <MenuItem value={1}>Low</MenuItem>
                      <MenuItem value={2}>Moderate</MenuItem>
                      <MenuItem value={3}>High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} item>
                  <FormControl fullWidth>
                    <InputLabel id='selectSeverityLabel'>
                      Severity Level
                    </InputLabel>
                    <Select
                      placeholder='Enter severity level'
                      labelId='selectSeverityLabel'
                      id='selectSeverity'
                      value={enteredSeverity}
                      label='Severity Level'
                      onChange={severityChangeHandler}
                      fullWidth
                      variant='outlined'
                      required
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
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
                          placeholder='Select assigned user'
                          label='Assigned user'
                          variant='outlined'
                          fullWidth
                          onBlur={enteredAlocUserHandler}
                        />
                      </div>
                    )}
                  />
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

export default NewBug;
