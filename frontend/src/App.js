import React, { useEffect,useContext, useState } from 'react'
import './Styles/App.css';

import { BrowserRouter as Router, Route, Switch, Redirect, useLocation, useHistory } from "react-router-dom";

import Login from './Components/routes/login'
import Home from './Components/routes/home'
import Nav from './Components/Common/nav'
import Vote from './Components/routes/vote'
import Stats from './Components/routes/stats'
import SignUp from './Components/routes/signUp'
import SwipeNav from './Components/Common/swipeNav'

import { AuthContext, AuthProvider } from './Auth'
import PrivateRoute from "./PrivateRoute";

import TokenModal from './Components/Common/tokenModal'
import app from './base'






const App = () => {

  const [userToken,updateUserToken] = useState(null)
  const [isSignedIn,updateIsSignedIn] = useState(false)
  const [isPlayer,updateIsPlayer] = useState(false)
  const [userStats,updateUserStats] = useState(null)
  const [playerName,updatePlayerName] = useState('')

  const [tokenExpired,updateTokenExpired] = useState(false)

  const history = useHistory();

  

  //listen to token expired
  useEffect(()=>{
    
    if(tokenExpired){
        console.log('User Token App.js when token expired -> ',userToken)
        console.log('Listener -> Your session token has expired.',tokenExpired)
        alert('Your session has expired. Please log out and log back in.')
    }
  },[tokenExpired])

  //general component did mount
  useEffect(()=>{
    //local storage will handle refresh
    if(localStorage.getItem("IS_PLAYER")==="true"){
      updateIsPlayer(true)
    }
    if(localStorage.getItem("IS_SIGNED_IN")==="true"){
      updateIsSignedIn(true)
    }
  },[])

  //listen to user stats
  useEffect(()=>{
    if(userStats){
      localStorage.setItem('NAME', userStats["firstname"]);
      localStorage.setItem('IS_PLAYER', userStats["isPlayer"]);
      localStorage.setItem('IS_SIGNED_IN', true);
      updateIsPlayer(userStats["isPlayer"])
      updatePlayerName(userStats["firstname"])
    }
  },[userStats])


  //listen to isSignedIn
  useEffect(()=>{
    console.log('Frontend Sign in status',isSignedIn)
  },[isSignedIn])


  //listen to user token
  useEffect(()=>{
    if(userToken!==null){
      checkToken(userToken)
      localStorage.setItem('TOKEN', userToken);
      getUserStats(userToken)
      updateIsSignedIn(true)
    } 
  },[userToken])

  



  const setToken = (token) =>{
    updateUserToken(token)
  }

  const getUserStats = async (token) =>{
    fetch('/api/userStats',{
      method: "GET",
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
  }).then(response=>response.json())
  .then(data=>{
    console.log('data from app.js',data)
    updateUserStats(data)
  })
    // let data = await response.json()
    // console.log('data from app.js',data)
    
  }

    const logoutUser = () =>{
      console.log('History from logout',history)

      // history.push("/")
      // app.auth().signOut();
      // localStorage.clear();
      updateIsSignedIn(false)
      // history.push('/')
  }

  const checkToken = async (token) =>{
    fetch('/api/userStats',{
      method: "GET",
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
    }).then(response=>response.json())
    .then(data=>{
      if(data.status==400){
        console.log('The session token has expired')
        updateTokenExpired(true)
      }
    })

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

let tokenModal = tokenExpired?<TokenModal/>:null
let tokenExpiredRender = tokenExpired?<div id="token-modal"><button onClick={()=>logoutUser()}>Please log out</button></div>:null




  return (
    
    <AuthProvider>
      <Router>
          <Switch>

            {/* Home screen is private and should only render on authentication success. */}
            <PrivateRoute exact path="/" component={Home} userToken={userToken} isPlayer={isPlayer} playerName={playerName}/>

            <Route path="/home" exact render={(props) => (<Home {...props} userToken={userToken}  isPlayer={isPlayer} playerName={playerName}/>)}></Route>
            

            {/* The rest of the routes are only accessible after hitting the home page */}
            <Route exact path="/login" render={(props) => (<Login {...props} setToken={setToken}/>)} />
            <Route exact path="/signup" render={(props) => (<SignUp {...props} setToken={setToken}/>)} />

            {/* create certain routes only if you are a player */}
            {isPlayer?<div>
            <Route path="/vote" exact render={(props) => (<Vote {...props} userToken={userToken}/>)}/>
            <Route path="/stats" exact render={(props) => (<Stats {...props} userToken={userToken} uid={'uid'}/>)}/>
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
      {/* {tokenExpiredRender} */}
    </AuthProvider>
    
    
  );
}

export default App;


