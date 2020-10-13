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
    const [dataLeagueStandings,updateDataLeagueStandings] = useState(null)


    const [futData,updateFutData] = useState([])
    const [futDataFetched,updateFutDataFetched] = useState(false)

    const { currentUser } = useContext(AuthContext);


    //league standings listener
    useEffect(()=>{
        // console.log('League Standings',dataLeagueStandings)
    },[dataLeagueStandings])

    //futData listener
    useEffect(()=>{
        if(futData.length!==0){
            console.log('Fut data in home.js ->',futData)
        }
    },[futData])



    //component did mount
    useEffect(()=>{
        console.log('Props in home.js ->',props)
        //fetch FUT info...'api/allStats
        getFUTData(props.userToken?props.userToken:localStorage.getItem('TOKEN'))
    },[])



    const getFUTData = async (token) =>{
        let response = await fetch('/api/allStats',{
            method: "GET",
            withCredentials: true,
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
        })
          let data = await response.json()
          let futDataArr = []
          console.log('All Stats for Fifa ->',data)

          for(const property in data){
              futDataArr.push(data[property])
          }
          updateFutData(futDataArr)
          updateFutDataFetched(true)
    }






    //page header logic
    let localName = localStorage.getItem('NAME')
    let renderHeader

    if(props.isPlayer || localStorage.getItem("IS_PLAYER")==="true"){
        renderHeader = <h1>Welcome {props.playerName?props.playerName:localName}</h1>
    } else{
        renderHeader = <h1>Welcome.</h1>
    }



    //car render logic
    let cardRender = futDataFetched?futData.map((card,index)=>{
        if(card.isPlayer){
            return(
                <FUTCard
                    key={index}
                    name={card.firstname}
                    stats={card.stats}
                    // overall={card.stats["overall"]}
                    // position = {card.stats["position"]}
                />
            )
        }
    }):null

    

    
    // let playerNameLocal = 'BOB';

    return([
        <div className="home-container-grid">
            <div className="header-container">
                {renderHeader}
                
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
                    {futDataFetched?cardRender:<PulseLoader
                        // css={override}
                        size={10}
                        color={"#FF0062"}
                        loading={futDataFetched}
                    />
                    
                    
                    
                    }
                    
                        
                        {/* {futData.map((card,index)=>{
                            return(
                                <FUTCard
                                    key={index}
                                    name={card.firstname}
                                    stats={card.stats}
                                    overall={card.stats.overall}
                                    position = {card.stats.position}
                                />
                            )
                        })} */}
   
                </div>
                
            </div>

            
        </div>,
        

    ])
}



export default Home