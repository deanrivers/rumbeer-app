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

            {/* Home screen is private and should only render on authentication success. */}
            <PrivateRoute exact path="/" component={Home} />

            {/* The rest of the routes are only accessible after hitting the home page */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/vote" exact component={Vote}></Route>
            <Route path="/stats" exact component={Stats}></Route>


          </Switch>
          <Nav/>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
