import '../../Styles/Stats.css'

import React from 'react'
import Standings from '../Common/standings'
import PlayerStats from '../Common/playerStats'
import Roster from '../Common/roster'

const Stats = (props) =>{

    return(
        <div id="stats-main-container">
            <div className="header-container">
    <h1 style={{marginBottom:'2%'}}>Hi, {props.playerName}! <br/>Here are your <br/>stats.</h1>
            </div>

            <div className="stats-section">
                <h1 className="sub-header">Stats.</h1>
                <PlayerStats/>
            </div>
            <div className="stats-section">
                <h1 className="sub-header">Your Team.</h1>
                <PlayerStats/>
            </div>

            <div className="stats-section">
                <h1 className="sub-header">Standings.</h1>
                <Standings token={props.userToken}/>
            </div>


            
        </div>
        
    )
}

export default Stats