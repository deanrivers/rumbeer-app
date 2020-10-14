import '../../Styles/Nav.css'

import React, {useEffect} from 'react'
import {NavLink} from 'react-router-dom'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import app from '../../base'
import SwipNav from './swipeNav'

const Nav = () =>{

    const activeStyle = {
        color:'white',
    }


    

    return(
        <div className="nav-container">
            <ul>
                <li>RUM AND BEER DRAFT LEAGUE</li>
                {/* <li onClick={() => app.auth().signOut()}>Logout</li> */}
                {/* <li onClick={() => alert('test')}>Logout</li> */}
                {/* <li><NavLink activeStyle={activeStyle} to="/vote">Vote</NavLink></li>
                <li><NavLink activeStyle={activeStyle} to="/stats">Stats</NavLink></li>
                <li><NavLink activeStyle={activeStyle} to="/home">Home</NavLink></li> */}
                <SwipNav/>
            </ul>
        </div>
    )
}

export default Nav