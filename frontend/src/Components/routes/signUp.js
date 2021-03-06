import '../../Styles/Signup.css'


import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../base";

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
import {NavLink} from 'react-router-dom'


const SignUp = ({ history,...props }) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor:'white',
      padding:'10%',
      border:'3px solid #FF0062',
      borderRadius:0,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      background:'#FF0062',
      color:'white'
    },
    header:{
      fontWeight:'bold'
    },
    link:{
      color:'black'
    }
  }));
  const classes = useStyles();

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

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, firstName } = event.target.elements;
    // console.log('Email',email.value)
    // console.log('Password',password.value)
    // console.log('First Name',firstName.value)

    //flask signup
    fetch('/api/signup',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        firstname:firstName.value
      })
    }).then(response=>response.json())
    .then(data=>{
      // console.log(data)
      if(data.status==200){
        // console.log('begin get token',data)
        console.log('Sign up success')
        getToken(email.value,password.value)
        // try {
        //   props.setToken(token)
        //   app.auth().signInWithEmailAndPassword(email.value, password.value);
        //   history.push("/");
        // } catch (error) {
        //   alert(error);
        // }
      } else if(data.status==400){
        alert('Error Signing Up. Please make sure you enter a valid email and password. Password must be at least 6 characters long.')
      }
    })

    // let data = await response.json()
    
    

    // if(responseStatus==200&&response.status==200){
    //     //try and login with the credentials returned by flask
    //     try {
    //       props.setToken(token)
    //       await app.auth().signInWithEmailAndPassword(email.value, password.value);
    //       history.push("/");
    //     } catch (error) {
    //       alert(error);
    //     }
    // }

  }, [history]);

  const getToken = (e,p) =>{
    fetch('/api/token',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:e,
        password:p,
      })
    }).then(response=>response.json())
    .then(async data=>{
      // console.log('Data in get sign up',data)
      props.setToken(data.token)
      await app.auth().signInWithEmailAndPassword(e, p);
      history.push("/");
    })
    // let data = await response.json()

    
    // return [data.token,response.status]
  }

  return (
    <div className="signup-container">

    
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.header}>
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="standard"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  InputProps={{
                    className:classes.textField,
                    border:'10px sold white'
                  }}
                />
              </Grid>

              <Grid item xs={12}>
              <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    className:classes.textField,
                    border:'10px sold white'
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    className:classes.textField,
                    border:'10px sold white'
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to="/login" className={classes.link}>
                  Already have an account? Sign in
                  
                    

                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={5}>
          <Copyright />
        </Box> */}
      </Container>
    </div>
  );
};

export default withRouter(SignUp);





