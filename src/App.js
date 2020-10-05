import React, { useEffect } from 'react'
import './Styles/App.css';

import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from "react-router-dom";

import Login from './Components/login'
import Home from './Components/home'
import Nav from './Components/Common/nav'
import Vote from './Components/vote'



const App = () => {




  return ([
    <Router>
        <Switch>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/" exact component={Login}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/vote" exact component={Vote}></Route>
        </Switch>
    </Router>,
    <Nav/>
  ]);
}

export default App;
