import '../../Styles/Stats.css'

import React from 'react'
import Standings from '../Common/standings'
import PlayerStats from '../Common/playerStats'

const Stats = () =>{

    return(
        <div id="stats-main-container">
            <div className="header-container">
                <h1 style={{marginBottom:'2%'}}>Stats Page.</h1>
            </div>

            <div className="stats-section">
                <h1>Your Stats.</h1>
                <PlayerStats/>
                
                
            </div>

            <div className="stats-section">
                <h1>Standings.</h1>
                <Standings/>
            </div>


            
        </div>
        
    )
}

export default Stats