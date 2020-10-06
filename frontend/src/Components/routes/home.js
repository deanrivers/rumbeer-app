import '../../Styles/Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import Standings from '../Common/standings'

import FUTCard from '../Common/futCard'


const Home = () =>{
    return([
        <div className="home-container-grid">
            <div className="header-container">
                <h1>WELCOME, <br/>PLAYER.</h1>
            </div>

            <div className="highlights-container grid-section">
                <h1 className="sub-header">Highlights.</h1>
                <div className="video-container">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/l1wQKbcOpSQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                
            </div>

            
            <div className="highlights-container grid-section">
                <h1 className="sub-header">League Standings.</h1>
                <div className="video-container">
                    <Standings/>
                </div>
                
            </div>

            {/* <div className="vote-container grid-section">
                <h1><u>Cast your input for this week's ratings.</u></h1>
            </div> */}

            <div className="fifa-card-container grid-section">
                <h1>Player Ratings.</h1>
                <div className="card-container">
                        <FUTCard/>
                        <FUTCard/>
                        <FUTCard/>
                        <FUTCard/>
                        <FUTCard/>
                        <FUTCard/>
                        <FUTCard/>
                        <FUTCard/>
                        <FUTCard/>
                        <FUTCard/>
                </div>
                
            </div>

            
        </div>,
        

    ])
}

export default Home