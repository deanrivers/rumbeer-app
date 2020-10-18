import '../../Styles/Stats.css'

import React, {useEffect, useState} from 'react'
import Standings from '../Common/standings'
import PlayerStats from '../Common/playerStats'
import Roster from '../Common/roster'

const Stats = (props) =>{
    let nameSession = localStorage.getItem('NAME')
    let storageToken = localStorage.getItem('TOKEN')

    const [sheetStats,updateSheetStats] = useState(null)
    const [userStats,updateUserStats] = useState(null)
    const [pageStats,updatePageStats] = useState(null)
    const [userStatsDone,updateUserStatsDone] = useState(false)
    


    useEffect(()=>{
        getCurrentUser(props.userToken?props.userToken:storageToken)
        getSheetStats(props.userToken?props.userToken:storageToken)
    },[])

    useEffect(()=>{


        // if(!userStats){
        //     getCurrentUser(props.userToken?props.userToken:storageToken)
        // }

        // if(!sheetStats){
        //     getSheetStats(props.userToken?props.userToken:storageToken)
        // }

        if(sheetStats&&userStats){
            // console.log('User Stats ->',userStats)
            // console.log('Sheet Stats ->',sheetStats)
            filterStats(userStats,sheetStats)
        }
    },[sheetStats,userStats])

    const filterStats = (userStats,sheetStats)=>{
        // console.log('filter triggered',userStats)
        try{
            let email = userStats.email
            let sheetStatsArr = sheetStats.stats

            // console.log(email,sheetStatsArr)

            for(let i=0;i<sheetStatsArr.length;i++){
                // console.log(sheetStatsArr[i])
                if(sheetStatsArr[i]["email"].toLowerCase()===email){
                    // console.log(sheetStatsArr[i])
                    updatePageStats(sheetStatsArr[i])
                    updateUserStatsDone(true)
                }
            }
        } catch(error){
            
        }
    }

    const getSheetStats = (token) =>{
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
                // console.log('Sheet Stats response ->',data)
                
                updateSheetStats(data)
            })
    }

    const getCurrentUser = (token) =>{
        fetch('/api/userStats',{
                method: "GET",
                withCredentials: true,
                credentials: 'include',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
                },
            }).then(response=>response.json())
            .then(data=>updateUserStats(data))
    }


    
    let statsRender = userStatsDone?<PlayerStats
                                        matchesPlayed={pageStats.matchesPlayed}
                                        goals={pageStats.goals}
                                        assists={pageStats.assists}
                                        nutMegs={pageStats.nutMegs}
                                        blocks={pageStats.blocks}
                                    />:null

    let rosterRender = userStatsDone?<Roster team={userStats.team} sheetStats={sheetStats} renderAll={true}/>:null

    return(
        <div id="stats-main-container">
            <div className="header-container">
                <h1 style={{marginBottom:'2%'}}>SOME SPORTS <br/><span className="emphasized-text"><i>DATA</i></span>.</h1>
            </div>

            <div className="stats-section">
                <h1 className="sub-header">YOUR STATS.</h1>
                {statsRender}
            </div>
            <div className="stats-section">
            <h1 className="sub-header">{userStatsDone?userStats.team:'Your Team'}.</h1>
                {rosterRender}
            </div>

            <div className="stats-section">
                <h1 className="sub-header">STANDINGS.</h1>
                <Standings token={props.userToken}/>
            </div>

        </div>
        
    )
}

export default Stats