import '../../Styles/Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import React, {useEffect,useState,useContext} from 'react'
import {Carousel} from 'react-responsive-carousel'
import Standings from '../Common/standings'
import { css } from "@emotion/core";

import { AuthContext } from "../../Auth";



import FUTCard from '../Common/futCard'


const Home = (props) =>{

    const [cardsLoading,updateCardsLoading] = useState(true)
    const [isLoading,updateIsLoading] = useState(true)
    const [dataLeagueStandings,updateDataLeagueStandings] = useState(null)

    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        console.log('League Standings',dataLeagueStandings)
    },[dataLeagueStandings])



    //component did mount
    useEffect(()=>{
        let token = props.userToken

        //fetch league standings
        // getLeagueStandings(token)

        //fetch FUT card info

    },[])



    const getFUTData = () =>{

    }

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
                    <Standings token={props.userToken}/>
                    
                    
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