import '../../Styles/VoteCards.css'


import React, { useState,useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import ReactCardFlip from "react-card-flip";

const VoteCard = (props) => {
  const [clearDisabled, updateClearDisabled] = useState(true);
  const [isFlipped, updateIsFlipped] = useState(false);

  //rating states
  const [paceValue, updatePaceValue] = useState('');
  const [shotValue, updateShotValue] = useState('');
  const [passValue, updatePassValue] = useState('');
  const [dribbleValue, updateDribbleValue] = useState('');
  const [defenseValue, updateDefenseValue] = useState('');
  const [physicalValue, updatePhysicalValue] = useState('');
  const [firstLoad,updateFirstLoad] = useState(true)

  //hook for sending back data
  useEffect(()=>{
    let data = {
      values:{
        'pace':paceValue,
        'shot':shotValue,
        'pass':passValue,
        'dribbling':dribbleValue,
        'defense':defenseValue,
        'physical':physicalValue},
      player:props.player,
      uid:props.uid
    }

    //push data back up to parent for this card
    if(!firstLoad) props.update(data)
    else updateFirstLoad(false)
  },[paceValue,shotValue,passValue,dribbleValue,defenseValue,physicalValue])


  const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      
      
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    rateButton: {
      backgroundColor: "#FF0062",
      color:'white'
    },
    clearButton: {
      borderColor: "black",
    },
    flippedBackgroundColor:{
      backgroundColor:"FF0062"
    }
  }));
  const classes = useStyles();

  //voting criteria
  const votingCriteria =[
    {
      name:'PACE',
      stateVariable:paceValue
    },
    {
      name:'SHO',
      stateVariable:shotValue
    },
    {
      name:'PAS',
      stateVariable:passValue
    },
    {
      name:'DRI',
      stateVariable:dribbleValue
    },
    {
      name:'DEF',
      stateVariable:defenseValue
    },
    {
      name:'PHY',
      stateVariable:physicalValue
    },
  ]

  

  

  const handleChange = (event) => {

    let type = event.target.name
    let value = event.target.value
    
    //clear field shoul now be clickable
    updateClearDisabled(false)
    
    //determine which radio button to toggle
    switch(type){
      case 'PACE':
        updatePaceValue(value)
        break
      case 'SHO':
        updateShotValue(value)
        break
      case 'PAS':
        updatePassValue(value)
        break
      case 'DRI':
        updateDribbleValue(value)
        break
      case 'DEF':
        updateDefenseValue(value)
        break
      case 'PHY':
        updatePhysicalValue(value)
        break
      default:
        alert('Not sure what is going on here...')
    }
  };

  const clearCard = () =>{
    updatePaceValue('')
    updateShotValue('')
    updatePassValue('')
    updateDribbleValue('')
    updateDefenseValue('')
    updatePhysicalValue('')
    updateClearDisabled(true)
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front */}
      {/* Front */}
      {/* Front */}
      {/* Front */}
      <Card className={classes.card}>
        
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title={`${props.player}`}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.player}
          </Typography>
          {/* <Typography>
            This is a media card. You can use this section to describe the
            content.
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            // color="primary"
            variant="contained"
            className={classes.rateButton}
            onClick={()=>updateIsFlipped(!isFlipped)}
          >
            Rate {`${props.player}`}
          </Button>
          
        </CardActions>
      </Card>

      {/* Back */}
      {/* Back */}
      {/* Back */}
      {/* Back */}
      <Card className={[classes.card,classes.flippedBackgroundColor]}>

        <CardContent className={classes.cardContent}>


          <div className="form">

            {votingCriteria.map( (item,index)=>{
              return(
                <div className="form-content" key={index}>
                  <Radio
                    checked={item.stateVariable === '-1'}
                    onChange={handleChange}
                    value="-1"
                    name={item.name}
                    inputProps={{ 'aria-label': '-1' }}
                    disabled={props.disableAll}
                  />
                  <FormLabel component="legend">{item.name}</FormLabel>
                  <Radio
                    checked={item.stateVariable === '1'}
                    onChange={handleChange}
                    value="1"
                    name={item.name}
                    inputProps={{ 'aria-label': '1' }}
                    disabled={props.disableAll}
                  />
                </div>
              )
            })}
          </div>

        </CardContent>
        <CardActions>
          <Button
            size="small"
            // color="primary"
            variant="contained"
            className={classes.rateButton}
            onClick={()=>updateIsFlipped(!isFlipped)}
          >
            Done
          </Button>
          <Button
            size="small"
            variant="outlined"
            disabled={clearDisabled}
            className={classes.clearButton}
            onClick={()=>clearCard()}
          >
            Clear
          </Button>
        </CardActions>
      </Card>


    </ReactCardFlip>
  );
};

export default VoteCard;
