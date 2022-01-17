import React from "react";
import { useState, useContext } from "react";
import {
  Card,
  TextField,
  CardContent,
  Grid,
  Button,
  // Autocomplete,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

const NewBug = () => {
  const auth = useContext(AuthContext);
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredCommit, setEnteredCommit] = useState("");
  const [enteredSeverity, setEnteredSeverity] = useState("");
  const [enteredPriority, setEnteredPriority] = useState("");
  const history = useHistory();

  const { sendRequest } = useHttpClient();

  const projectId = useParams().projectId;

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

  const formHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:8000/api/bugs/project/${projectId}`,
        "POST",
        JSON.stringify({
          description: enteredDescription,
          commit: enteredCommit,
          severity: enteredSeverity,
          priority: enteredPriority,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push("/projects");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <div className='App'>
        <Typography padding='1rem' variant='h3' align='center' color='#f3f3f3'>
          Add Bug
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
                  <Grid item xs={12}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      fullWidth
                      style={{
                        backgroundColor: "#5d5cbc",
                      }}
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
    </React.Fragment>
  );
};

export default NewBug;
