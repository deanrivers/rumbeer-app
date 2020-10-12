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
  const [isPlayer,updateIsPlayer] = useState(true)

  useEffect(()=>{
    console.log('Frontend Sign in status',isSignedIn)
  },[isSignedIn])

  useEffect(()=>{
    if(playerName){
      console.log(playerName)

    }
  },[playerName])

  useEffect(()=>{
    console.log('Token from App.js ->',userToken)
    if(userToken!==null&&playerName!==''){

      
      //session storage for token
      //setter
      // localStorage.setItem('TOKEN', userToken);
      setLocalStorage(userToken,playerName)

      
      // // remove
      // localStorage.removeItem('myData');

      //get the players name and update state to be passed as a prop
      // getPlayerName(userToken)
    }
  },[userToken])
  
  const setToken = (token) =>{
    updatePlayerName('Dean')
    updateUserToken(token)
    
    updateIsSignedIn(true)
  }

  const logoutUser = () =>{
    updateIsSignedIn(false)
  }

  const getPlayerName = () =>{

  }

  const setLocalStorage = (userToken,playerName) =>{
    localStorage.setItem('TOKEN', userToken);
    localStorage.setItem('NAME', playerName);
  }


  let home = isSignedIn?<Route exact path="/">
                                  <Redirect to="/home" />
                        </Route>:null

  let redirects = isPlayer?null:<div>
                                <Route exact path="/vote">
                                    <Redirect to="/home" />
                                </Route>
                                <Route exact path="/stats">
                                    <Redirect to="/home" />
                                </Route>

                                </div>

  return (
    
    <AuthProvider>
      <Router>
          <Switch>

            {/* Home screen is private and should only render on authentication success. */}
            <PrivateRoute exact path="/" component={Home} userToken={userToken} playerName={playerName} isPlayer={isPlayer}/>
            <Route path="/home" exact render={(props) => (<Home {...props} userToken={userToken}  playerName={playerName} isPlayer={isPlayer}/>)}></Route>
            

            {/* The rest of the routes are only accessible after hitting the home page */}
            <Route exact path="/login" render={(props) => (<Login {...props} setToken={setToken}/>)} />
            <Route exact path="/signup" render={(props) => (<SignUp {...props} setToken={setToken}/>)} />

            {/* create certain routes only if you are a player */}
            {isPlayer?<div>
            <Route path="/vote" exact render={(props) => (<Vote {...props} userToken={userToken}/>)}/>
            <Route path="/stats" exact render={(props) => (<Stats {...props} userToken={userToken} playerName={playerName} uid={'uid'}/>)}/>
            </div>
            :null
          }

          </Switch>
          {/* <Nav/> */}

          {/* {isSignedIn?<SwipeNav logout={logoutUser}/>:null} */}
          <SwipeNav logout={logoutUser} isPlayer={isPlayer}/>
          

          {/* this allows the app to redirect to '/home' instead of '/' */}
          {home}

          {/* add redirects if not a player */}
          {redirects}


      </Router>
    </AuthProvider>
    
    
  );
}

export default App;


