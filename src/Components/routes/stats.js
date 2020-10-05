import '../../Styles/Stats.css'

import React from 'react'
import Standings from '../Common/standings'

const Stats = () =>{

    return(
        <div id="stats-main-container">
            <div className="header-container">
                <h1 style={{marginBottom:'2%'}}>Stats Page.</h1>
            </div>

            <div>
                <h1>Standings.</h1>
                <Standings/>
            </div>
            
        </div>
        
    )
}

export default Stats