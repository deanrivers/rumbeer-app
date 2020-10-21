import '../../Styles/Vote.css'

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

import ballersImage from '../../assets/teams/ballers.png'
import beerMunichImage from '../../assets/teams/beer_munich.png'
import flatbushImage from '../../assets/teams/flatbush.png'
import realTobagoImage from '../../assets/teams/real_tobago.png'
import SimpleModal from '../Common/tokenModal'

//player images


import imagepedro from '../../assets/vote_cards/pedro.png'
import imageadolfo from '../../assets/vote_cards/adolfo.png'
import imageakeem from '../../assets/vote_cards/akeem.png'
import imageanatoliy from '../../assets/vote_cards/anatoliy.png'
import imagebaba from '../../assets/vote_cards/baba.png'
import imagecarlton from '../../assets/vote_cards/carlton.png'
import imagecj from '../../assets/vote_cards/cj.png'
import imagedaley from '../../assets/vote_cards/daley.png'
import imagedamion from '../../assets/vote_cards/damion.png'
import imagedanny from '../../assets/vote_cards/danny.png'
import imageduke from '../../assets/vote_cards/duke.png'
import imagefernand from '../../assets/vote_cards/fernand.png'
import imagegivemedat from '../../assets/vote_cards/givemedat.png'
import imagehope from '../../assets/vote_cards/hope.png'
import imageirwing from '../../assets/vote_cards/irwing.png'
import imagejesse from '../../assets/vote_cards/jesse.png'
import imagekhalfani from '../../assets/vote_cards/khalfani.png'
import imagemax from '../../assets/vote_cards/max.png'
import imagemiguel from '../../assets/vote_cards/miguel.png'
import imagemikhail from '../../assets/vote_cards/mikhail.png'
import imagemoses from '../../assets/vote_cards/moses.png'
import imagepollo from '../../assets/vote_cards/pollo.png'
import imagereed from '../../assets/vote_cards/reed.png'
import imagerinaldy from '../../assets/vote_cards/Rinaldy.png'
import imagesantos from '../../assets/vote_cards/santos.png'
import imagescott from '../../assets/vote_cards/scott.png'
import imageshaun from '../../assets/vote_cards/shaun.png'
import imagestephon from '../../assets/vote_cards/stephon.png'
import imagetheo from '../../assets/vote_cards/theo.png'
import imagetimori from '../../assets/vote_cards/timori.png'
import imagetommy from '../../assets/vote_cards/tommy.png'
import imageziham from '../../assets/vote_cards/ziham.png'

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
    marginTop:'10%',
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
      // background: 'linear-gradient(45deg, #FF0062 30%, #FF8E53 90%)',
      // background:'black',
      background:'#FF0062'
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
  const [canVote,updateCanVote] = useState(true)
  const [userVoteCount,updateUserVoteCount] = useState(null)
  const [weekData,updateWeekData] = useState(null)
  const [hasVoted,updateHasVoted] = useState(false)

  const classes = useStyles();

  useEffect(()=>{
    // console.log('Props in vote js ->',props)
    // console.log('Current User in vote js',currentUser.email)
    
  },[])
  
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
      console.log('Vote.js Players',playersData)
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
    //numVotes === how many votes you have left
    // console.log('Number of votes left',numVotes)
    if(numVotes === 0){
      updateDisableAll(true)
      updateSubmitDisabled(false)
    }

    if(numVotes<20){
      updatedClearDisabled(false)
      
    } else if(numVotes===20){
      updatedClearDisabled(true)
      updateSubmitDisabled(true)
    }

    if(numVotes>0){
      updateDisableAll(false)
      updateSubmitDisabled(true)
    } 
  },[numVotes])

  //listen to whether or not the player can vote
  useEffect(()=>{
    // console.log('Can Vote?',canVote)
    if(canVote){
      console.log('You are allowed to vote!',canVote)
    }
  },[canVote])

  //functions
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

      
      //week values
      let weekDateStart,weekDateEnd,elligibleCount

      //elligibleObj
      let elligibleObj = {
        "10/18/20":{
          count:1
        },
        "10/25/20":{
          count:2
        },
        "11/1/20":{
          count:3
        },
        "11/8/20":{
          count:4
        }
      }
      let dateArr = ["10/18/20","10/25/20","11/1/20","11/8/20"]
      let firstDay = new Date(dateArr[0])

      for(let i=0;i<dateArr.length;i++){
        weekDateStart = new Date(dateArr[i])
        weekDateEnd = new Date(dateArr[i+1])

        if(today<firstDay){
          elligibleCount = 0
          console.log(today,firstDay)
          console.log('League hasnt started yet!')
          updateCanVote(false)
          break
        }

        if(today>weekDateStart&&today<weekDateEnd){
          elligibleCount = elligibleObj[dateArr[i]]
          break
        } else if(dateArr[i]=="11/8/20"){
          elligibleCount = elligibleObj[dateArr[i]]
          console.log('Else triggered',weekDateStart,weekDateEnd)
          break
        } 
      }

      console.log('Votes as of today ->',votesToday)
      console.log('Votes elligible ->',elligibleCount)

      if(votesToday<elligibleCount.count){
        console.log('You are eligible!')
        updateCanVote(true)
      } else{
        console.log('You are not eligible.')
        updateCanVote(false)
      }  
  }

  const submitRatings = async () =>{
    let tokenSession = localStorage.getItem('TOKEN')
    let updatedStats = await updatePlayerStats()

    console.log('Updated Stats ->',updatedStats)
    
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
    .then(data=>{
      console.log('Data after submit',data)
      if(data.status==200){
        updateCanVote(false)
      }
    })
    
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
        let {pace:currentPace,shot:currentShot,pass:currentPass,dribbling:currentDribbling,defense:currentDefense,physical:currentPhysical} = currentPlayerStats[i]["stats"]
        let {pace:updatePace,shot:updateShot,pass:updatePass,dribbling:updateDribbling,defense:updateDefense,physical:updatePhysical} = currentPlayer["stats"]
        let position = currentPlayerStats[i]["position"]
        
        console.log('Position ->',position)

        // let pace,defense,dribbling,physical,shot,pass
        // pace = currentPace+parseInt(updatePace)
        // defense = currentDefense+parseInt(updateDefense)
        // dribbling = currentDribbling+parseInt(updateDribbling)
        // physical = currentPhysical+parseInt(updatePhysical)
        // shot = currentShot+parseInt(updateShot)
        // pass = currentPass+parseInt(updatePass)

        //1 should be "+1"
        //-1 should be "-1"
        //"" should be "0"

        //pace
        if(updatePace==="1"){
          updatePace = "+1"
        } else if(updatePace==="-1"){
          updatePace = "-1"
        } else{
          updatePace = "0"
        }

        //shot
        if(updateShot==="1"){
          updateShot = "+1"
        } else if(updateShot==="-1"){
          updateShot = "-1"
        } else{
          updateShot = "0"
        }

        //pass
        if(updatePass==="1"){
          updatePass = "+1"
        } else if(updatePass==="-1"){
          updatePass = "-1"
        } else{
          updatePass = "0"
        }

        //dribbling
        if(updateDribbling==="1"){
          updateDribbling = "+1"
        } else if(updateDribbling==="-1"){
          updateDribbling = "-1"
        } else{
          updateDribbling = "0"
        }

        //defense
        if(updateDefense==="1"){
          updateDefense = "+1"
        } else if(updateDefense==="-1"){
          updateDefense = "-1"
        } else{
          updateDefense = "0"
        }

        //physical
        if(updatePhysical==="1"){
          updatePhysical = "+1"
        } else if(updatePhysical==="-1"){
          updatePhysical = "-1"
        } else{
          updatePhysical = "0"
        }
      
        comparedStats.push({
          uid:uid,
          firstname:currentPlayerStats[i]["firstname"],
          stats:{
            "pace": updatePace,
            "defense": updateDefense,
            "dribbling": updateDribbling,
            "physical": updatePhysical,
            "shot": updateShot,
            "pass": updatePass,
            "position":position
          }
        })
      } catch(error){
        // console.log(error)
      }
    }

    // console.log('Compared Stats',comparedStats)

    return comparedStats
  }
  
  const updateVoteCounter = (data) =>{
    let voteData = data["voteData"]
    let arr = []
    
    //determine how many "1"s and "-1"s there
    for(const property in voteData){
      // console.log(voteData[property]["stats"])
      for(const innerProperty in voteData[property]["stats"]){
        if(voteData[property]["stats"][innerProperty]==="1" || voteData[property]["stats"][innerProperty]==="-1" ){
          arr.push('Vote')
        }
      }
    }

    updateNumVotes(20-arr.length)  
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

  const teamLogos = {
    'BALLERS FOR LIFE FC':ballersImage,
    'FLATBUSH UNITED':flatbushImage,
    'BEER N MUNICH':beerMunichImage,
    'REAL TOBAGO FC':realTobagoImage,
}

  const playerImages = {
      "adolfo.lee@gmail.com":imageadolfo,
      "akeem.fletcher13@gmail.com":imageakeem,
      "scale49@aol.com":imageanatoliy,
      "ojemmott63@gmail.com":imagebaba,
      "cantforgetthisone.cw@gmail.com":imagecarlton,
      "cjdoherty6@gmail.com":imagecj,
      "daley_goveia@live.com":imagedaley,
      "damionbill@gmail.com":imagedamion,
      "dnoray03@gmail.com":imagedanny,
      "dukecharles@icloud.com":imageduke,
      "fernandgrisales@gmail.com":imagefernand,
      "tassjnr@gmail.com":imagegivemedat,
      "irwingforbes@gmail.com":imageirwing,
      "jesses.fg@gmail.com":imagejesse,
      "hopetondixon@gmail.com":imagehope,
      "eriqk.alexander@gmail.com":imagekhalfani,
      "webb.adrian.k@gmail.com":imagemax,
      "topdon1359@gmail.com":imagemiguel,
      "budhai@gmail.com":imagemikhail,
      "smedlymoise@theswede.me":imagemoses,
      "perdo4100@gmail.com":imagepedro,
      "luispollito53@gmail.com":imagepollo,
      "reedfox3@gmail.com":imagereed,
      "rinology@gmail.com":imagerinaldy,
      "davidsantos2416@gmail.com":imagesantos,
      "scott_savory@live.com":imagescott,
      "roshmore17@gmail.com":imageshaun,
      "steph.beckford10@gmail.com":imagestephon,
      "tbishop14@gmail.com":imagetheo,
      "timori207@gmail.com":imagetimori,
      "tom_bom95@yahoo.com":imagetommy,
      "ziham.ascencio@gmail.com":imageziham,
  }



  let cardRender = playersData?playersData.map((card,index)=>{
    if(currentUser.email!==card.email&&card.email!=="test@test.com"){
      // console.log('Render Card ->',card)
      return(
        canVote?
        <Grid item key={index} xs={12} sm={6} md={4}>
          <VoteCard
            player={card.firstname}
            uid={card.uid}
            update={updateVoteDataState}
            disableAll={disableAll?true:false}
            image={playerImages[card.email]}
            // image={imageTest}
            team={teamLogos[card.team]}
            teamString={card.team}
            position={card.position}
          />
        </Grid>:null
      )
  }
  }):null

  return (
    <React.Fragment>
      
      {canVote?
      <main style={{margin: '10%'}}>


        <div className="side-menu">
          <div className="vote-count-container">
            <span>{numVotes} VOTES LEFT!</span>
            
          </div>
          {!submitDisabled?
          <button  disabled={submitDisabled}  onClick={()=>submitRatings()}>
              SUBMIT RATINGS
          </button>:null
          }
        </div>
        <div className="header-container vote-header">
            <h1>CAST YOUR <span className="emphasized-text"><i>VOTES</i></span> FOR THIS WEEK.</h1>
                
        </div>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
              Player Ratings.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Below you will see every player that is currently enrolled in the Rum and Beer League.
              Please Submit your ratings for last week's performance. <b>You MUST have 20 ratings made before you can submit.</b>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" disabled={submitDisabled} className={classes.submitButton} onClick={()=>submitRatings()}>
                    {submitDisabled?'Rate Someone!':'Submit Ratings'}
                  </Button>
                </Grid>
                <Grid item>
                  {/* <Button variant="outlined" className={classes.clearButton} disabled={clearDisabled} onClick={()=>resetRatings()}>
                    Clear All Ratings
                  </Button> */}
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cardRender}
          </Grid>
        </Container>
      </main>:
      <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          You can no longer vote! Come back next week.
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Each player is only allowed one voting session per week. Please come back next week.
        </Typography>
      </Container>
    </div>}


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

      




      
    </React.Fragment>
  );
}

export default Vote