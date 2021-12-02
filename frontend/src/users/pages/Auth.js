import React from "react";
import { useContext, useState } from "react";
import "./Auth.css";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Auth = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const surnameChangeHandler = (event) => {
    setEnteredSurname(event.target.value);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(enteredEmail);
    console.log(enteredPassword);
    try {
      const responseData = await sendRequest(
        "http://localhost:8000/api/users/signup",
        "POST",
        JSON.stringify({
          name: enteredName,
          surname: enteredSurname,
          email: enteredEmail,
          password: enteredPassword,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.user.id);
    } catch (err) {}
  };

  return (
    <div className='App'>
      <Typography padding='1rem' variant='h3' align='center' color='#f3f3f3'>
        Log In
      </Typography>
      <Grid>
        <Card
          className='mainCardContainer'
          style={{
            backgroundColor: "#f3f3f3",
            borderRadius: "10px",
            maxWidth: 450,
            padding: "20px 5px",
            margin: "0 auto",
          }}
        >
          <CardContent>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              gutterBottom
            >
              Log In into the app using your email and password.
            </Typography>
            <form onSubmit={authSubmitHandler}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    className='textField'
                    type='text'
                    placeholder='Enter name'
                    label='Name'
                    variant='outlined'
                    fullWidth
                    required
                    onChange={nameChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className='textField'
                    type='text'
                    placeholder='Enter surname'
                    label='Surname'
                    variant='outlined'
                    fullWidth
                    required
                    onChange={surnameChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className='textField'
                    type='email'
                    placeholder='Enter email'
                    label='Email'
                    variant='outlined'
                    fullWidth
                    required
                    onChange={emailChangeHandler}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    className='textField'
                    type='password'
                    placeholder='Enter password'
                    label='Password'
                    variant='outlined'
                    fullWidth
                    required
                    onChange={passwordChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className='muibtn'
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

export default Auth;
