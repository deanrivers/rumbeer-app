import '../Styles/Login.css'
import {accent} from '../Styles/Standard'

import React from 'react'
import {NavLink} from 'react-router-dom'

const Login = () =>{

    const style = {
        "backgroundColor":accent.color,
        "border":`5px solid ${accent.color}`
    }

    return(
        <div id="main-login-container">

            <div className="login-container">
                <div className="header-container">
                    <h1>RUM & BEER<br/> DRAFT LEAGUE</h1>
                </div>
                
                <div class="buttons-container">
                    <NavLink to="/home"><button id="login-button" className="button">LOGIN</button></NavLink>
                    <button id="register-button" className="button">REGISTER</button>
                </div>
            </div>


            
        </div>
    )
}

export default Login