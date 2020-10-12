import React, {useEffect, useState} from 'react';
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

//const cards = [1, 2, 3,4,5,6,7,8,9,10];




// const playerStats = {
//   'Ronaldo':{
//     stats:[],
    
//   },
//   'Messi':{
//     stats:[],
    
//   }
// }



const playerStats = {
  'Ronaldo':{
    'stats':{
      'PACE':'',
      'SHO':'',
      'PAS':'',
      'DRI':'',
      'DEF':'',
      'PHY':'',
    }
  },
  'Messi':{
    'stats':{
      'PACE':'0',
      'SHO':'',
      'PAS':'',
      'DRI':'',
      'DEF':'',
      'PHY':'',
    }
  },
  'Pogba':{
    'stats':{
      'PACE':'0',
      'SHO':'',
      'PAS':'',
      'DRI':'',
      'DEF':'',
      'PHY':'',
    }
  }
}

const playerCards = [
  'Ronaldo','Messi','Pogba'
]







const Vote = (props) => {
  const [clearDisabled,updatedClearDisabled] = useState(true) 
  const [playersData,updatePlayersData] = useState(null)
  const [voteData,updateVoteData] = useState(playerStats)
  const classes = useStyles();

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
    let criteria = {'stats':{
      'PACE':'0',
      'SHO':'',
      'PAS':'',
      'DRI':'',
      'DEF':'',
      'PHY':'',
    }}

    for (const property in data){
      if(data[property]["isPlayer"]===true){
        filteredArr.push({...data[property],criteria})
      }
    }

    console.log('Filtered Arr ->',filteredArr)

    updatePlayersData(filteredArr)



  }

  //listen to player data from flask
  useEffect(()=>{
    let tokenSession = localStorage.getItem('TOKEN')
    console.log('Token State',props.token)
    console.log('Token Session',tokenSession)

    if(playersData){
      console.log('Vote.js Players',playersData)
    } else{
      getAllStats(props.token?props.token:tokenSession)
    }
  },[playersData])

  //listen to voteData
  useEffect(()=>{
    // console.log('Vote Data in effect',voteData)
    console.log('Player Stats from effect Hook',playerStats)
  },[voteData])


  //functions
  const submitRatings = () =>{

  }
  
  const updateVoteCounter = () =>{
    
  }

  const resetRatings = () =>{

  }

  const updateVoteDataState = (playerData) =>{
    let playerDataObj = voteData
    let player = playerData.player

    // console.log('Player Data from vote.js',playerData)
    // console.log('Object->',playerStats)
    // console.log(playerDataObj.player.values)
    // console.log('Player->',playerDataObj[player])

    playerDataObj[player]['stats'] = {...playerData.values}
    updateVoteData({...playerDataObj})
  }

  let cardRender = playersData?playersData.map((card,index)=>{
    return(
      <Grid item key={index} xs={12} sm={6} md={4}>
        <VoteCard
          player={card.firstname}
          // update={updateVoteDataState}
          update={(data)=>console.log(data)}
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
              Please Submit your ratings for last week's performance. You have a total of 5 Ratings.
              Use them wisely!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" className={classes.submitButton}>
                    Submit Ratings
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" className={classes.clearButton} disabled={clearDisabled}>
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