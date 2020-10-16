import React, {useEffect, useState, useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import VoteCard from '../Common/voteCard'

import { AuthContext } from "../../Auth";


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        RumBeer.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  submitButton:{
      background: 'linear-gradient(45deg, #FF0062 30%, #FF8E53 90%)',
  },
  clearButton:{
    borderColor:'black'
  }
}));

const Vote = (props) => {

  const {currentUser} = useContext(AuthContext);


  
  const [userUID,updateUserUID] = useState(currentUser["uid"])
  const [playersData,updatePlayersData] = useState(null)

  //frontend logic for buttons and counter
  const [numVotes,updateNumVotes] = useState(10)
  const [submitDisabled,updateSubmitDisabled] = useState(true)
  const [clearDisabled,updatedClearDisabled] = useState(true) 
  const [disableAll,updateDisableAll] = useState(false)
  
  const [voteData,updateVoteData] = useState({})
  const [newPlayerStats,updateNewPlayerStats] = useState({})

  //can the player vote?
  const [canVote,updateCanVote] = useState(false)
  const [userVoteCount,updateUserVoteCount] = useState(null)
  const [weekData,updateWeekData] = useState(null)

  const classes = useStyles();
//listen to week data
  
  useEffect(()=>{
    
    
    if(userVoteCount!==null&&weekData){
      console.log('Vote Counter State ->',userVoteCount)
      determineEligibility(weekData)
    }
  },[userVoteCount,weekData])


  //listen to player data from flask
  useEffect(()=>{
    let tokenSession = localStorage.getItem('TOKEN')

    if(playersData){
      // console.log('Vote.js Players',playersData)
    } else{
      getAllStats(props.token?props.token:tokenSession)
      getWeekData(props.token?props.token:tokenSession)
      getVoteCount(props.token?props.token:tokenSession)
    }
  },[playersData])

  //listen to voteData
  useEffect(()=>{
    // console.log('Player Vote Data from effect Hook',voteData)
    updateVoteCounter({voteData})
  },[voteData])

  //listen to the number of votes
  useEffect(()=>{
    console.log('Number of votes left',numVotes)
    if(numVotes === 0){
      updateDisableAll(true)
    }

    if(numVotes<10){
      updatedClearDisabled(false)
      updateSubmitDisabled(false)
    } else if(numVotes===10){
      updatedClearDisabled(true)
      updateSubmitDisabled(true)
    }

    if(numVotes>0){
      
      updateDisableAll(false)
    } 
  },[numVotes])

      //listen to whether or not the player can vote
  useEffect(()=>{
    console.log('Can Vote?',canVote)
  },[canVote])


  const getAllStats = async (token) =>{
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
    
    let filteredArr = []
    // let criteria = {'stats':{
    //   'PACE':'0',
    //   'SHO':'',
    //   'PAS':'',
    //   'DRI':'',
    //   'DEF':'',
    //   'PHY':'',
    // }}

    let uid
    let obj = {}


    for (const property in data){
      if(data[property]["isPlayer"]===true){
        // filteredArr.push({...data[property]})
        uid = data[property]["uid"]
        obj ={uid:uid}

        filteredArr.push({...data[property]})
      }
    }

    // console.log('Filtered Arr ->',filteredArr)

    updatePlayersData(filteredArr)

  }

  const getWeekData = token =>{
    fetch('/api/weekData',{
      method: "GET",
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
    }).then(response=>response.json())
    .then(weekData=>{

      console.log('Week data ->',weekData)
      updateWeekData(weekData.weeks)
    })

  }

  const getVoteCount = (token) =>{
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
    .then(data=>updateUserVoteCount(data.voteCounter))
  }
  
  const determineEligibility = (weeks) =>{
      console.log('Determine Eligibility ->',weeks)
      let votesToday = userVoteCount
      
      //todays values
      let today = new Date()
      // console.log('Today ->',today)
      let month = today.getMonth()+1
      // let day = today.getDay()
      // let year = today.getFullYear()
      // let currentWeek

      //week values
      let weekDate

      //elligibleObj
      let elligibleObj = {
        week1:{
          count:0
        },
        week2:{
          count:1
        },
        week3:{
          count:2
        },
        week4:{
          count:3
        }
      }

      //determine which week we are in.
      //loop through  weeks...if the current date is less than, move to next week and stop
      for(const property in weeks){
        
        // console.log(weeks[property])
        weekDate = new Date(weeks[property])
        // console.log('Week date',weekDate)

        if(today<weekDate){
          console.log(weekDate)


          //check vote counter and update state accordingly
          if(votesToday<=elligibleObj[property]["count"]){
            console.log('You are elligible!')
            console.log('Votes Today State ->',votesToday)
            console.log('Elligible Obj Count->',elligibleObj[property]["count"])
            updateCanVote(true)
            break
          } else{
            updateCanVote(false)
            break
          }


          break
        }
      }

 
  
  }

  //functions
  const submitRatings = async () =>{
    let tokenSession = localStorage.getItem('TOKEN')
    let updatedStats = await updatePlayerStats()
    
    fetch('/api/updateStats',{
      method: "POST",
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': props.token?props.token:tokenSession
      },
      body: JSON.stringify({
        updates:updatedStats,
        uid: userUID
      })
    }).then(response=>response.json())
    .then(data=>console.log(data))
  }

  const updatePlayerStats = async () =>{
    let currentPlayerStats = playersData
    let votedPlayerStats = voteData
    let comparedStats = []

    console.log('Current Stats of players displayed ->',currentPlayerStats)
    console.log('Voted players ->',votedPlayerStats)
    
    

    //compare and update
    // console.log('current stats',currentPlayerStats)
    // console.log('voted stats',votedPlayerStats)

    let uid,currentPlayer

    
    //loop through and compare uids
    for(let i=0;i<currentPlayerStats.length;i++){
      uid = currentPlayerStats[i]["uid"]

      currentPlayer = votedPlayerStats[uid] 
      console.log('Current Player Being Evaluated ->',i,currentPlayer)

      try{
        let {pace:currentPace,shot:currentShot,pass:currentPass,dribbling:currentDribbling,defense:currentDefense,physical:currentPhysical,position} = currentPlayerStats[i]["stats"]
        let {pace:updatePace,shot:updateShot,pass:updatePass,dribbling:updateDribbling,defense:updateDefense,physical:updatePhysical} = currentPlayer["stats"]


        let pace,defense,dribbling,physical,shot,pass
        pace = currentPace+parseInt(updatePace)
        defense = currentDefense+parseInt(updateDefense)
        dribbling = currentDribbling+parseInt(updateDribbling)
        physical = currentPhysical+parseInt(updatePhysical)
        shot = currentShot+parseInt(updateShot)
        pass = currentPass+parseInt(updatePass)
        
        //calculate overall based on average of stats
        let statsArr = [pace?pace:currentPace,defense?defense:currentDefense,dribbling?dribbling:currentDribbling,physical?physical:currentPhysical,shot?shot:currentShot,pass?pass:currentPass]

        let statsSum = statsArr.reduce((a,b)=>{
          return a + b 
        })
        
        let overall = Math.floor(statsSum/statsArr.length)

       



        comparedStats.push({
          uid:uid,
          firstname:currentPlayerStats[i]["firstname"],
          stats:{
            "pace": pace?pace:currentPace,
            "defense": defense?defense:currentDefense,
            "dribbling": dribbling?dribbling:currentDribbling,
            "physical": physical?physical:currentPhysical,
            "shot": shot?shot:currentShot,
            "pass": pass?pass:currentPass,
            "overall":overall,
            "position":position
          }
        })
      } catch(error){
        // console.log(error)
      }
    }

    return comparedStats
  }
  
  const updateVoteCounter = (data) =>{
    let voteData = data["voteData"]
    let arr = []
    
    //determine how many "1"s and "-1"s there
    for(const property in voteData){
      console.log(voteData[property]["stats"])
      for(const innerProperty in voteData[property]["stats"]){
        if(voteData[property]["stats"][innerProperty]==="1" || voteData[property]["stats"][innerProperty]==="-1" ){
          arr.push('Vote')
        }
      }
    }

    updateNumVotes(10-arr.length)  
  }

  const resetRatings = () =>{
    updateDisableAll(false)
    updateSubmitDisabled(true)
    updatedClearDisabled(true)
    updateDisableAll(false)
  }

  //update ratings object for submission
  const updateVoteDataState = (playerData) =>{
    let playerDataObj = voteData
    let player = playerData.player
    let uid = playerData.uid
    // console.log('Player Data ->',playerData)
    playerDataObj[uid] = {stats:{...playerData.values},firstname:player}
    updateVoteData({...playerDataObj})
    
  }

  let cardRender = playersData?playersData.map((card,index)=>{
    return(
      <Grid item key={index} xs={12} sm={6} md={4}>
        <VoteCard
          player={card.firstname}
          uid={card.uid}
          update={updateVoteDataState}
          disableAll={disableAll}
        />
      </Grid>
    )
  }):null

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Player Ratings
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Below you will see every player that is currently enrolled in the Rum and Beer League.
              Please Submit your ratings for last week's performance. You have a total of {numVotes} Ratings.
              Use them wisely!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" disabled={submitDisabled} className={classes.submitButton} onClick={()=>submitRatings()}>
                    Submit Ratings
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" className={classes.clearButton} disabled={clearDisabled} onClick={()=>resetRatings()}>
                    Clear All Ratings
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>



            {/* create a card for each player */}
            {/* {playerCards.map((card,index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <VoteCard
                  player={card}
                  update={updateVoteDataState}
                />
              </Grid>
            ))} */}
            
            {cardRender}


          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Rum and Beer Draft League.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default Vote