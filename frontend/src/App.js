import React, { useEffect } from 'react'
import './Styles/App.css';

import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";

import Login from './Components/routes/login'
import Home from './Components/routes/home'
import Nav from './Components/Common/nav'
import Vote from './Components/routes/vote'
import Stats from './Components/routes/stats'
import SignUp from './Components/routes/signUp'

import { AuthProvider } from './Auth'
import PrivateRoute from "./PrivateRoute";



const App = () => {

  return (
    <AuthProvider>
      <Router>
          <Switch>


              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />

             
              <Route path="/login" exact component={Login}></Route>
              <Route path="/" exact component={Login}></Route>
              <Route path="/home" exact component={Home}></Route>
              <Route path="/vote" exact component={Vote}></Route>
              <Route path="/stats" exact component={Stats}></Route>

              <Route exact path="/rumbeer-app">
                <Redirect to="/" />
              </Route>

          </Switch>
          <Nav/>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
