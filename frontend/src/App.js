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

  const [userToken,updateUserToken] = useState('')
  const [isSignedIn,updateIsSignedIn] = useState(false)

  useEffect(()=>{
    console.log('Token ->',typeof(userToken))
  },[userToken])
  
  const setToken = (token) =>{
    updateUserToken(token)
  }

  return (
    
    <AuthProvider>
      <Router>
          <Switch>

            {/* Home screen is private and should only render on authentication success. */}
            <PrivateRoute exact path="/" component={Home} />

            {/* The rest of the routes are only accessible after hitting the home page */}
            <Route exact path="/login" render={(props) => (<Login {...props} setToken={setToken}/>)} />
            <Route exact path="/signup" render={(props) => (<SignUp {...props} setToken={setToken}/>)} />
            <Route path="/vote" exact component={Vote}></Route>
            <Route path="/stats" exact component={Stats}></Route>
            <Route path="/home" exact render={(props) => (<Home {...props} userToken={userToken}/>)}></Route>


          </Switch>
          {/* <Nav/> */}
          <SwipeNav/>

      </Router>
    </AuthProvider>
    
    
  );
}

export default App;


