import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from '../../base';
import { AuthContext } from "../../Auth";
import {NavLink} from 'react-router-dom'


//material
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Nav from "../Common/nav";

const Login = ({ history }) => {

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const [userToken,updateUserToken] = useState('')

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  // const handleLogin = useCallback(
  //   async event => {
  //     event.preventDefault();
  //     const { email, password } = event.target.elements;
  //     console.log(email.value,password.value)
  //     try {
  //       await app.auth().signInWithEmailAndPassword(email.value, password.value)

  //       history.push("/");
  //     } catch (error) {
  //       alert(error);
  //     }
  //   },[history]);



  const loginFlask = async (event) =>{
    event.preventDefault();
    
    const { email, password } = event.target.elements;
    console.log(email.value,password.value)
    let response = await fetch('/api/token',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    let data = await response.json()
    console.log('Token',data)


    

    // updateUserToken()
  }

  const { currentUser } = useContext(AuthContext);

  // if (currentUser) {
  //   return <Redirect to="/" />;
  //   // return <Redirect to={{
  //   //   pathname:'/',
  //   //   token:{userToken}
  //   // }} />;
  // }

  // return (
  //   <div className="login-container">
  //     <h1>Log in</h1>
  //     <form onSubmit={handleLogin}>
  //       <label>
  //         Email
  //         <input name="email" type="email" placeholder="Email" />
  //       </label>
  //       <label>
  //         Password
  //         <input name="password" type="password" placeholder="Password" />
  //       </label>
  //       <button type="submit">Log in</button>
  //     </form>
  //   </div>
  // );
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={loginFlask}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <NavLink to="/signup">
                <Link variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </NavLink>
              
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

};

export default withRouter(Login);










