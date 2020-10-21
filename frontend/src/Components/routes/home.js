import '../../Styles/Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import React, {useEffect,useState} from 'react'
import Standings from '../Common/standings'
import {PulseLoader} from "react-spinners";
import PlayerStatsAll from '../Common/playerStatsAll'

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


const Home = (props) =>{
    const [futData,updateFutData] = useState(null)
    const [futDataFetched,updateFutDataFetched] = useState(false)
    const [allPlayerData,updateAllPlayerData] = useState(null)
    const [allPlayersFetched,updateAllPlayersFetched] = useState(false)


    //component did mount
    useEffect(()=>{
        getFUTData(props.userToken?props.userToken:localStorage.getItem('TOKEN'))
        getAllPlayerStats(props.userToken?props.userToken:localStorage.getItem('TOKEN'))
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

          for(const property in data){
              futDataArr.push(data[property])
          }
          updateFutData(futDataArr)
          updateFutDataFetched(true)
    }

    const getAllPlayerStats = (token) =>{
        fetch('/api/sheetStats',{
            method: "GET",
            withCredentials: true,
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
        }).then(response=>response.json())
        .then(data=>{
            // console.log("Player stats home page =>",data)
            let statsData = data.stats
            let dataArr = []

            for(let i = 0;i<statsData.length;i++){
                dataArr.push(statsData[i])
            }

            //used to order array by points
            const compare = (a, b) => {
                let pointA = a.points
                let pointB = b.points
                let comparison = 0;
                if (pointA > pointB) {
                  comparison = -1;
                } else if (pointA < pointB) {
                  comparison = 1;
                }
                return comparison;
              }
            
            dataArr.sort(compare)

            updateAllPlayerData(dataArr)
            updateAllPlayersFetched(true)
        })
    }

    const countryFlags = {
        'ARGENTINA':imageArgentina,
        'BARBADOS':imageBarbados,
        'COLOMBIA':imageColombia,
        'COSTA RICA':imageCostarica,
        'EL SALVADOR':imageElsalvador,
        'FRANCE':imageFrance,
        'GUYANA':imageGuyana,
        'HAITI':imageHaiti,
        'HONDURAS':imageHonduras,
        'ITALY':imageItaly,
        'JAMAICA':imageJamaica,
        'PUERTO RICO':imagePuertorico,
        'RUSSIA':imageRussia,
        'TANZANIA':imageTanzania,
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
        "adolfo.lee@gmail.com":imageadolfo,
        "akeem.fletcher13@gmail.com":imageakeem,
        "scale49@aol.com":imageAnatoliy,
        "ojemmott63@gmail.com":imagebaba,
        "cantforgetthisone.cw@gmail.com":imagecarlton,
        "cjdoherty6@gmail.com":imagecj,
        "daley_goveia@live.com":imagedaley,
        "damionbill@gmail.com":imagebill,
        "dnoray03@gmail.com":imagedanny,
        "dukecharles@icloud.com":imageduke,
        "fernandgrisales@gmail.com":imagefernand,
        "tassjnr@gmail.com":imagegivmedat,
        "irwingforbes@gmail.com":imageirwing,
        "jesses.fg@gmail.com":imagejesse,
        "hopetondixon@gmail.com":imagehope,
        "eriqk.alexander@gmail.com":imagekhalfani,
        "webb.adrian.k@gmail.com":imagemax,
        "topdon1359@gmail.com":imagemiguel,
        "budhai@gmail.com":imagemikhail,
        "smedlymoise@theswede.me":imagemoise,
        "perdo4100@gmail.com":imagePED,
        "luispollito53@gmail.com":imagepollo,
        "reedfox3@gmail.com":imagereed,
        "rinology@gmail.com":imageRINAL,
        "davidsantos2416@gmail.com":imagesantos,
        "scott_savory@live.com":imagescott,
        "roshmore17@gmail.com":imageROSHAU,
        "steph.beckford10@gmail.com":imagesteph,
        "tbishop14@gmail.com":imageteeboy,
        "timori207@gmail.com":imagetimori,
        "tom_bom95@yahoo.com":imagetommy,
        "ziham.ascencio@gmail.com":imageziham,
    }

    //page header logic
    let localName = localStorage.getItem('NAME')
    let renderHeader

    if(props.isPlayer || localStorage.getItem("IS_PLAYER")==="true"){
        renderHeader = <h1>WELCOME TO THE RUM & BEER LEAGUE, <span className="emphasized-text"><i>{props.playerName?props.playerName:localName}</i></span>.</h1>
    } else{
        renderHeader = <h1>WELCOME TO THE <span className="emphasized-text"><i>LEAGUE</i></span>.</h1>
    }

    //car render logic
    let cardRender = futDataFetched?futData.map((card,index)=>{
        if(card.isPlayer&&card.email!=="test@test.com"){
            let email = card.email
            let team = card.team
            let country = card.country
            return(
                <FUTCard
                    key={index}
                    name={card.firstname}
                    stats={card.stats}
                    overall={card.stats["overall"]}
                    position = {card.position}
                    country={countryFlags[country]}
                    team={teamLogos[team]}
                    image={playerImages[email]}
                />
            )
        }
    }):null

    let allStatsRender = allPlayersFetched?<PlayerStatsAll data={allPlayerData}/>
                                            :
                                            <PulseLoader
                                            // css={override}
                                            size={10}
                                            color={"#FF0062"}
                                            loading={allPlayersFetched}/>

    return([
        <div className="home-container-grid">
            <div className="header-container">
                {renderHeader}
            </div>
            
            <div className="highlights-container grid-section">
                <h1 className="sub-header">All Player Stats.</h1>
                <div className="stats-container">
                    {allStatsRender}
                </div>
            </div>
            <div className="highlights-container grid-section">
                <h1 className="sub-header">League Standings.</h1>
                <div className="standings--container">
                    <Standings token={props.userToken}/>
                </div>
            </div>

            <div className="fifa-card-container grid-section">
                <h1>Player Ratings.</h1>
                <div className="card-container">
                    {futDataFetched?cardRender:<PulseLoader
                        // css={override}
                        size={10}
                        color={"#FF0062"}
                        loading={futDataFetched}
                    />}
                </div>
            </div>
        </div>,
    ])
}



export default Home