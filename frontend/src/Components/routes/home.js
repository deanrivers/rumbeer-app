import '../../Styles/Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import React, {useEffect,useState,useContext} from 'react'
import {Carousel} from 'react-responsive-carousel'
import Standings from '../Common/standings'
import { css } from "@emotion/core";
import {PulseLoader} from "react-spinners";

import { AuthContext } from "../../Auth";



import FUTCard from '../Common/futCard'

//images for FUT
//countries
import imageArgentina from '../../assets/flags/argentina.png'
import imageBarbados from '../../assets/flags/barbados.png'
import imageColombia from '../../assets/flags/colombia.png'
import imageCostarica from '../../assets/flags/costarica.png'
import imageElsalvador from '../../assets/flags/elsalvador.png'
import imageFrance from '../../assets/flags/france.png'
import imageGuyana from '../../assets/flags/guyana.png'
import imageHaiti from '../../assets/flags/haiti.png'
import imageHonduras from '../../assets/flags/honduras.png'
import imageItaly from '../../assets/flags/italy.png'
import imageJamaica from '../../assets/flags/jamaica.png'
import imagePuertorico from '../../assets/flags/puertorico.png'
import imageRussia from '../../assets/flags/russia.png'
import imageTanzania from '../../assets/flags/tanzania.png'
import imageTrinidad from '../../assets/flags/trinidad.png'
import imageUsa from '../../assets/flags/usa.png'

//team logos
import ballersImage from '../../assets/teams/ballers.png'
import beerMunichImage from '../../assets/teams/beer_munich.png'
import flatbushImage from '../../assets/teams/flatbush.png'
import realTobagoImage from '../../assets/teams/real_tobago.png'
import SimpleModal from '../Common/tokenModal'

//player images
import imageadolfo from '../../assets/players/adolfo.png'
import imageakeem from '../../assets/players/akeem.png'
import imageAnatoliy from '../../assets/players/Anatoliy.png'
import imagebaba from '../../assets/players/baba.png'
import imagebill from '../../assets/players/bill.png'
import imagecarlton from '../../assets/players/carlton.png'
import imagecj from '../../assets/players/cj.png'
import imagedaley from '../../assets/players/daley.png'
import imagedanny from '../../assets/players/danny.png'
import imageduke from '../../assets/players/duke.png'
import imagefernand from '../../assets/players/fernand.png'
import imagegivmedat from '../../assets/players/givmedat.png'
import imagehope from '../../assets/players/hope.png'
import imageirwing from '../../assets/players/irwing.png'
import imagejesse from '../../assets/players/jesse.png'
import imagekhalfani from '../../assets/players/khalfani.png'
import imagemax from '../../assets/players/max.png'
import imagemiguel from '../../assets/players/miguel.png'
import imagemikhail from '../../assets/players/mikhail.png'
import imagemoise from '../../assets/players/moise.png'
import imagePED from '../../assets/players/PED.png'
import imagepollo from '../../assets/players/pollo.png'
import imagereed from '../../assets/players/reed.png'
import imageRINAL from '../../assets/players/RINAL.png'
import imageROSHAU from '../../assets/players/ROSHAU.png'
import imagesantos from '../../assets/players/santos.png'
import imagescott from '../../assets/players/scott.png'
import imagesteph from '../../assets/players/steph.png'
import imageteeboy from '../../assets/players/teeboy.png'
import imagetimori from '../../assets/players/timori.png'
import imagetommy from '../../assets/players/tommy.png'
import imageziham from '../../assets/players/ziham.png'




// adolfo.png
// akeem.png
// Anatoliy.png
// baba.png
// bill.png
// carlton.png
// cj.png
// daley.png
// danny.png
// duke.png
// fernand.png
// givmedat.png
// hope.png
// irwing.png
// jesse.png
// khalfani.png
// max.png
// miguel.png
// mikhail.png
// moise.png
// PED.png
// pollo.png
// reed.png
// RINAL.png
// ROSHAU.png
// santos.png
// scott.png
// steph.png
// teeboy.png
// timori.png
// tommy.png
// ziham.png

// ADOLFO.LEE@GMAIL.COM
// AKEEM.FLETCHER13@GMAIL.COM
// SCALE49@AOL.COM
// OJEMMOTT63@GMAIL.COM
// CANTFORGETTHISONE.CW@GMAIL.COM
// CJDOHERTY6@GMAIL.COM
// DALEY_GOVEIA@LIVE.COM
// DAMIONBILL@GMAIL.COM
// DNORAY03@GMAIL.COM
// DUKECHARLES@ICLOUD.COM
// FERNANDGRISALES@GMAIL.COM
// TASSJNR@GMAIL.COM
// IRWINGFORBES@GMAIL.COM
// JESSES.FG@GMAIL.COM
// HOPETONDIXON@GMAIL.COM
// ERIQK.ALEXANDER@GMAIL.COM
// WEBB.ADRIAN.K@GMAIL.COM
// TOPDON1359@GMAIL.COM
// BUDHAI@GMAIL.COM
// SMEDLYMOISE@THESWEDE.ME
// PERDO4100@GMAIL.COM
// LUISPOLLITO53@GMAIL.COM
// REEDFOX3@GMAIL.COM
// RINOLOGY@GMAIL.COM
// DAVIDSANTOS2416@GMAIL.COM
// SCOTT_SAVORY@LIVE.COM
// ROSHMORE17@GMAIL.COM
// STEPH.BECKFORD10@GMAIL.COM
// TBISHOP14@GMAIL.COM
// TIMORI207@GMAIL.COM
// TOM_BOM95@YAHOO.COM
// ZIHAM.ASCENCIO@GMAIL.COM
const Home = (props) =>{

    const [cardsLoading,updateCardsLoading] = useState(true)
    const [isLoading,updateIsLoading] = useState(true)
    const [dataLeagueStandings,updateDataLeagueStandings] = useState(null)


    const [futData,updateFutData] = useState([])
    const [futDataFetched,updateFutDataFetched] = useState(false)

    const { currentUser } = useContext(AuthContext);

    const [tokenExpired,updateTokenExpired] = useState(false)




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

        //   if(response.status==400){
        //     //console.log('Token Expired.')
        //     //alert('Your token has expired. Please lougout and back in.')
        //     // alert(response.status)
        //     updateTokenExpired(true)
        //   }

          

          for(const property in data){
              futDataArr.push(data[property])
          }
          updateFutData(futDataArr)
          updateFutDataFetched(true)
    }


    const countryFlags = {
        'ARGENTINA':imageArgentina,
        'BARBADOS':imageBarbados,
        'COLOMBIA':imageColombia,
        'COSTARICA':imageCostarica,
        'EL SALVADOR':imageElsalvador,
        'FRANCE':imageFrance,
        'GUYANA':imageGuyana,
        'HAITI':imageHaiti,
        'HONDURAS':imageHonduras,
        'ITALY':imageItaly,
        'JAMAICA':imageJamaica,
        'PUERTO RICO':imagePuertorico,
        'RUSSIA':imageRussia,
        'TANZANI':imageTanzania,
        'TRINIDAD & TOBAGO':imageTrinidad,
        'USA':imageUsa,
    }

    const teamLogos = {
        'BALLERS FOR LIFE FC':ballersImage,
        'FLATBUSH UNITED':flatbushImage,
        'BEER N MUNICH':beerMunichImage,
        'REAL TOBAGO FC':realTobagoImage,
    }

    const playerImages = {
        "ADOLFO.LEE@GMAIL.COM":imageadolfo,
        "AKEEM.FLETCHER13@GMAIL.COM":imageakeem,
        "SCALE49@AOL.COM":imageAnatoliy,
        "OJEMMOTT63@GMAIL.COM":imagebaba,
        "CANTFORGETTHISONE.CW@GMAIL.COM":imagecarlton,
        "CJDOHERTY6@GMAIL.COM":imagecj,
        "DALEY_GOVEIA@LIVE.COM":imagedaley,
        "DAMIONBILL@GMAIL.COM":imagebill,
        "DNORAY03@GMAIL.COM":imagedanny,
        "DUKECHARLES@ICLOUD.COM":imageduke,
        "FERNANDGRISALES@GMAIL.COM":imagefernand,
        "TASSJNR@GMAIL.COM":imagegivmedat,
        "IRWINGFORBES@GMAIL.COM":imageirwing,
        "JESSES.FG@GMAIL.COM":imagejesse,
        "HOPETONDIXON@GMAIL.COM":imagehope,
        "ERIQK.ALEXANDER@GMAIL.COM":imagekhalfani,
        "WEBB.ADRIAN.K@GMAIL.COM":imagemax,
        "TOPDON1359@GMAIL.COM":imagemiguel,
        "BUDHAI@GMAIL.COM":imagemikhail,
        "SMEDLYMOISE@THESWEDE.ME":imagemoise,
        "PERDO4100@GMAIL.COM":imagePED,
        "LUISPOLLITO53@GMAIL.COM":imagepollo,
        "REEDFOX3@GMAIL.COM":imagereed,
        "RINOLOGY@GMAIL.COM":imageRINAL,
        "DAVIDSANTOS2416@GMAIL.COM":imagesantos,
        "SCOTT_SAVORY@LIVE.COM":imagescott,
        "ROSHMORE17@GMAIL.COM":imageROSHAU,
        "STEPH.BECKFORD10@GMAIL.COM":imagesteph,
        "TBISHOP14@GMAIL.COM":imageteeboy,
        "TIMORI207@GMAIL.COM":imagetimori,
        "TOM_BOM95@YAHOO.COM":imagetommy,
        "ZIHAM.ASCENCIO@GMAIL.COM":imageziham,
    }

    //token expired render
    


    

    




    //page header logic
    let localName = localStorage.getItem('NAME')
    let renderHeader

    if(props.isPlayer || localStorage.getItem("IS_PLAYER")==="true"){
        renderHeader = <h1>Welcome to the league, {props.playerName?props.playerName:localName}.</h1>
    } else{
        renderHeader = <h1>Welcome.</h1>
    }



    //car render logic
    let cardRender = futDataFetched?futData.map((card,index)=>{
        
  
        
        if(card.isPlayer){
            let email = card.email
            let team = card.team
            let country = card.country
            console.log('Individual card details->',email,team,country)
            return(
                <FUTCard
                    key={index}
                    name={card.firstname}
                    stats={card.stats}
                    overall={card.stats["overall"]}
                    position = {card.position}
                    // team={teamLogos.ballers}
                    // country={countryFlags.trinidad}
                    country={countryFlags[country]}
                    team={teamLogos[team]}
                    image={playerImages[email]}
                
                    
                    
                />
            )
        }
    }):null

    

    
    // let playerNameLocal = 'BOB';

    return([
        ,
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