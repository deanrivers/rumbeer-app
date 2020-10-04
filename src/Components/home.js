import '../Styles/Home.css'
import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import FUTCard from './Common/futCard'

const Home = () =>{
    return([
        <div className="home-container-grid">
            <div className="header-container">
                <h1>WELCOME, <br/>PLAYER.</h1>
            </div>

            <div className="highlights-container grid-section">
                <h1>Highlights.</h1>
            </div>

            <div className="vote-container grid-section">
                <h1><u>Cast your input for this week's ratings.</u></h1>
            </div>

            <div className="fifa-card-container grid-section">
            
                <div className="card-container">
                    
                    <FUTCard/>
                    <FUTCard/>
                    <FUTCard/>
                    

                        
  
                    

                </div>
                
            </div>

            
        </div>
    ])
}

export default Home