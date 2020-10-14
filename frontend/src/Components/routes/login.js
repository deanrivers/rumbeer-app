import '../../Styles/Login.css'


import React, { useCallback, useContext, useState, useEffect } from "react";
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


const Login = ({history,...props}) => {

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

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor:'#FF0062',
      backgroundColor:'white',
      padding:'10%',
      borderRadius:5,
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

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements;


      //get token from backend flask server
      if(email.value!==''&&password.value!==''){
        let [token,responseStatus,userStats] = await getToken(email.value,password.value)
        if(responseStatus==200){
          try {
            props.setToken(token)
            await app.auth().signInWithEmailAndPassword(email.value, password.value)
            history.push("/");
          } catch (error) {
            alert('An error occured.')
            console.log(error);
          }
        }
    }
      
    },[history]);

  const getToken = async (e,p) =>{
    let response = await fetch('/api/token',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:e,
        password:p,
      })
    })
    let data = await response.json()

    //get user stats using token you just got
    // let userStats = await getUserStats(data.token)
    
    return [data.token,response.status]
  }

  // const getUserStats = async (token) =>{
  //   let response = await fetch('/api/userStats',{
  //     method: "GET",
  //     withCredentials: true,
  //     credentials: 'include',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': token
  //     },
  // })
  //   let data = await response.json()
  //   console.log('User Stats from login',data)
  //   return data
  // }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Please login to enter.
          </Typography>

          <form className={classes.form}  onSubmit={handleLogin} >
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
    </div>
  );

};



// export default connect(mapStateToProps)(withRouter(Login));
export default withRouter(Login);










