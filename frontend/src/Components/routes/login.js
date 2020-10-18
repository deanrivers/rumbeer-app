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

  const [displayError,updateDisplayError] = useState(false)

  useEffect(()=>{
    console.log('Login error?',displayError)
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
  }));
  const classes = useStyles();

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements;


      //get token from backend flask server
      if(email.value!==''&&password.value!==''){
        let response = await getToken(email.value,password.value)
        console.log('Response form login await',response)
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
    console.log('Login token',e,p)
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
      console.log('data from login',data)
      if(data.status==200){
        console.log('Success!',data)
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

      // if(responseStatus==200){
      //     try {
      //       props.setToken(token)
      //       await app.auth().signInWithEmailAndPassword(email.value, password.value)
      //       history.push("/");
      //     } catch (error) {
      //       alert('An error occured.')
      //       console.log(error);
      //     }
      //   }

    // let response = fetch('/api/token',{
    //     method: "POST",
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       email:e,
    //       password:p,
    //     })
    //   })
    // let data = await response.json()
    // console.log('Await in token fetch',data)

    // return [data.token,response.status]
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
          <Typography component="h1" variant="h5" className={classes.header}>
            Please login to enter.
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
              {/* <Grid item xs>
                <Link href="#" variant="body2" className={classes.link}>
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <NavLink to="/signup">
                  <Link variant="body2" className={classes.link}>
                    Don't have an account? Sign Up
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










