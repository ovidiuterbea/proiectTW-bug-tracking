import React from "react";
import { useContext } from "react";
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
const Auth = () => {
  const auth = useContext(AuthContext);

  const authSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    className='textField'
                    type='email'
                    placeholder='Enter email'
                    label='Email'
                    variant='outlined'
                    fullWidth
                    required
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
