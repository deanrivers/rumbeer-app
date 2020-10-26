import '../../Styles/ForgotPassword.css'


import React, { useCallback,useState } from "react";
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


const ForgotPassword = () => {

  const [linkSent,updateLinkSent] = useState(false)
  

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
    },
    linkeSentMessage:{
      color:'white',
      fontWeight:'bold',
      textAlign:'center'
    },
    loginLink:{
      color:'white',
      textDecoration:'none'
    }
  }));
  const classes = useStyles();

  const handleSubmit = useCallback( event =>{
    event.preventDefault();
    const { email } = event.target.elements;

    //hit flask
    fetch('/api/resetPassword',{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email.value,
        })
    }).then(response=>response.json())
    .then(data=>{
      if(data.status==200){
        // alert('Email sent!')
        updateLinkSent(true)
      } else if(data.status==400){
        alert('Email not sent. Please make sure you enter your email.')
        updateLinkSent(false)
      } else if(data.status==401){
        alert('There is no account with that email.')
        updateLinkSent(false)
      }
    })
  })

  return (
    <div className="forgot-password-container">

    
      <Container component="main" maxWidth="xs">
        {linkSent?
        <div>
          <Typography component="h1" variant="h5" className={classes.linkeSentMessage}>
            An email has been sent to reset your password
          </Typography>
          <NavLink to="/login" className={classes.loginLink}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Go to Login
              </Button>
            </NavLink>
          </div>
          
          
          
          :
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.header}>
            Please Provide Your Email
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  // className={classes.textField}
                  InputProps={{
                    className:classes.textField,
                    border:'10px sold white'
                  }}
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Send Reset Link
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
        }
      </Container>
    </div>
  );
};

export default withRouter(ForgotPassword);





