import '../../Styles/Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import React, {useEffect,useState,useContext} from 'react'
import {Carousel} from 'react-responsive-carousel'
import Standings from '../Common/standings'
import { css } from "@emotion/core";
import {PulseLoader} from "react-spinners";
import { AuthContext } from "../../Auth";



import FUTCard from '../Common/futCard'


const Home = (props) =>{

    const [cardsLoading,updateCardsLoading] = useState(true)
    const [isLoading,updateIsLoading] = useState(true)

    const { currentUser } = useContext(AuthContext);

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;


    //component didi mount
    useEffect(()=>{

        console.log('Home Mounted')

        let token = props.userToken
        let name = 'Dean'

        //fetch league standings
        getLeagueStandings(token)

        //fetch FUT card info


    },[])

    const getLeagueStandings = async (token) =>{
        let bearer = 'Bearer' + token
        console.log('Getting League Standings')
        console.log('This is the token in home--->',token)
        let response = await fetch('/api/sheetStandings',{
            method: "GET",
            withCredentials: true,
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': bearer
            },
      
            //make sure to serialize your JSON body
        })
        let data = await response.json()
        console.log('Data for League Standings 2->',data)
    }

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
                    {/* <PulseLoader
                        css={override}
                        size={10}
                        color={"#FF0062"}
                        loading={isLoading}
                        
                    /> */}
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