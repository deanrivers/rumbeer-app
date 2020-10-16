import React , {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    borderRadius:'5px',
    boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);'
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    fontSize:'2rem',
    fontWeight:'bold'
  },
}));



// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

const PlayerStats = (props) =>{

  useEffect(()=>{
    // console.log('Props in playerStats.js ->',props)
  },[])

  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const arr = ["Matches Played","Goals Scored","Assists","Nutmegs","Hat Tricks"]

  const playerStats = [
    {
      attr:"Matches Played",
      value:props.matchesPlayed
    },
    {
      attr:"Goals Scored",
      value:props.goals
    },
    {
      attr:"Assists",
      value:props.assists
    },
    {
      attr:"Nutmegs",
      value:props.nutMegs
    },
    {
      attr:"Blocks",
      value:props.blocks
    },

  ]

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {/* <Typography variant="h6" className={classes.title}>
            Player Stats.
          </Typography> */}
          <div className={classes.demo}>
            <List dense={dense}>

            {playerStats.map((item,index)=>{
                return(
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${item.attr}: ${item.value}`}
                            
                        />
                        {/* <ListItemText
                            primary={`${item.value}`}
                            
                        /> */}
                        {/* <span>- {item.value}</span> */}
                    </ListItem>
                )
            })}




              {/* {generate(
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )} */}
            </List>
          </div>
        </Grid>
      </Grid>
  
    </div>
  );
}

export default PlayerStats