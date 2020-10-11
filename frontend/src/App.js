import React, { useEffect,useContext, useState } from 'react'
import './Styles/App.css';

import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";

import Login from './Components/routes/login'
import Home from './Components/routes/home'
import Nav from './Components/Common/nav'
import Vote from './Components/routes/vote'
import Stats from './Components/routes/stats'
import SignUp from './Components/routes/signUp'
import SwipeNav from './Components/Common/swipeNav'

import { AuthContext, AuthProvider } from './Auth'
import PrivateRoute from "./PrivateRoute";







const App = () => {

  const [userToken,updateUserToken] = useState(null)
  
  const [isSignedIn,updateIsSignedIn] = useState(false)
  const [playerName,updatePlayerName] = useState('')

  useEffect(()=>{
    console.log('Frontend Sign in status',isSignedIn)
  },[isSignedIn])

  useEffect(()=>{
    console.log('Token from App.js ->',userToken)
    if(userToken!==null){

      //session storage for token
      //setter
      localStorage.setItem('TOKEN', userToken);

      
      // // remove
      // localStorage.removeItem('myData');

      //get the players name and update state to be passed as a prop
      getPlayerName(userToken)
    }
  },[userToken])
  
  const setToken = (token) =>{
    updateUserToken(token)
    updateIsSignedIn(true)
  }

  const logoutUser = () =>{
    updateIsSignedIn(false)
  }

  const getPlayerName = () =>{

  }


  let home = isSignedIn?<Route exact path="/">
                                  <Redirect to="/home" />
                                </Route>:null

  return (
    
    <AuthProvider>
      <Router>
          <Switch>

            {/* Home screen is private and should only render on authentication success. */}
            <PrivateRoute exact path="/" component={Home} userToken={userToken}/>
            

            {/* The rest of the routes are only accessible after hitting the home page */}
            <Route exact path="/login" render={(props) => (<Login {...props} setToken={setToken}/>)} />
            <Route exact path="/signup" render={(props) => (<SignUp {...props} setToken={setToken}/>)} />
            <Route path="/vote" exact render={(props) => (<Vote {...props} userToken={userToken}/>)}></Route>
            <Route path="/stats" exact render={(props) => (<Stats {...props} userToken={userToken}/>)}></Route>
            <Route path="/home" exact render={(props) => (<Home {...props} userToken={userToken}/>)}></Route>
            
          

          </Switch>
          {/* <Nav/> */}
          <SwipeNav logout={logoutUser}/>


          {home}


      </Router>
    </AuthProvider>
    
    
  );
}

export default App;


