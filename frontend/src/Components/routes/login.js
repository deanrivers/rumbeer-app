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

  const [displayError,updateDisplayError] = useState(false)

  useEffect(()=>{
    // console.log('Login error?',displayError)
  },[displayError])

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // backgroundColor:'#FF0062',
      border:'3px solid #FF0062',
      backgroundColor:'white',
      padding:'10%',
      borderRadius:0,
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
      background:'#FF0062',
      color:'white'
    },
    header:{
      color:'#FF0062',
      color:'black',
      fontWeight:'bold'
    },
    link:{
      color:'black',
    },
    guestButton:{
      color:'white',
      borderColor:'#FF0062',
      // border:'2px solid #FF0062'
    }
  }));
  const classes = useStyles();

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements;


      //get token from backend flask server
      if(email.value!==''&&password.value!==''){
        getToken(email.value,password.value)
        // console.log('Response form login await',response)
        // if(responseStatus==200){
        //   try {
        //     props.setToken(token)
        //     await app.auth().signInWithEmailAndPassword(email.value, password.value)
        //     history.push("/");
        //   } catch (error) {
        //     alert('An error occured.')
        //     console.log(error);
        //   }
        // }
    }
      
    },[history]);

  const getToken = async (e,p) =>{
    // console.log('Login token',e,p)
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
      // console.log('data from login',data)
      if(data.status==200){
        // console.log('Success!',data)
        updateDisplayError(false)
        try {
          props.setToken(data.token)
          await app.auth().signInWithEmailAndPassword(e, p)
          history.push("/");
        } catch (error) {
          alert('An error occured.')
          console.log(error);
        }
      } else if(data.status==400){
        // console.log('Something is wrong')
        alert('Something Went wrong. Please make sure your email and password are correct.')
        updateDisplayError(true)
      } else{
        console.log('Not sure whats happening',data)
      }
    })
  }

  const handleGuestLogin = async () =>{
    await app.auth().signInAnonymously().catch((error) =>{
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    })

    await app.auth().onAuthStateChanged( async (user) => {
      if (user) {
        // console.log('Guest User ->',user)
        // User is signed in.
        var isAnonymous = user.isAnonymous
        var uid = user.uid      
        let token = await user.getIdToken()
        
        //set token
        props.setToken(token)
        props.updateGuest(isAnonymous)
        history.push("/");
        // ...
      } else {
        // User is signed out.
        console.log('User is Signed Out')
        // ...
      }
    })
  }

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
          <Typography component="h1" variant="h5" className={classes.header}>
            Please login to enter. 
          </Typography>
          <Typography component="h1" variant="h5" className={classes.header}>
            Environment variable - {process.env.REACT_APP_NAME}
          </Typography>

          <form className={classes.form}  onSubmit={handleLogin} className={classes.root}>
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
            <TextField
              variant="standard"
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
              // color="primary"
              className={classes.submit}
            >
              Sign In 
            </Button>
            <Grid container>
              <Grid item xs>
              <NavLink to="/forgot-password" className={classes.link}>
                Forgot password
              </NavLink>
              </Grid>
              <Grid item >
                <NavLink to="/signup" className={classes.link}>
                  {/* <Link variant="body2" className={classes.link}>
                    Sign Up
                  </Link> */}
                  Sign Up
                </NavLink>
                
              </Grid>
            </Grid>
          </form>
          
        </div>
        <Box mt={2}>
          {/* <Copyright /> */}
          <Button
              // type="submit"
              onClick={handleGuestLogin}
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.guestButton}
            >
              Log In As Guest 
            </Button>
        </Box>
        
      </Container>
    </div>
  );

};



// export default connect(mapStateToProps)(withRouter(Login));
export default withRouter(Login);










