import '../../Styles/Nav.css'

import React, {useEffect} from 'react'
import {NavLink} from 'react-router-dom'

const Nav = () =>{

    const activeStyle = {
        color:'white',
    }

    return(
        <div className="nav-container">
            
            <ul>
                <li>RUM AND BEER DRAFT LEAGUE</li>

                <li><NavLink activeStyle={activeStyle} to="/login">Logout</NavLink></li>
                <li><NavLink activeStyle={activeStyle} to="/vote">Vote</NavLink></li>
                <li><NavLink activeStyle={activeStyle} to="/stats">Stats</NavLink></li>
                <li><NavLink activeStyle={activeStyle} to="/home">Home</NavLink></li>
                
            </ul>
        </div>
    )
}

export default Nav