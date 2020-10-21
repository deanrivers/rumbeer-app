import React , {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDebugValue } from 'react';
import {PulseLoader} from "react-spinners";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(player, position, mp, goals, assists, nutmegs, blocks) {
  return { player, position, mp, goals, assists, nutmegs, blocks };
}

// const rows = [
//   createData('Bayern', 3, 3, 0, 0, 10,6,0,9),
//   createData('Barcelona', 3, 3, 0, 0, 10,6,0,9),
//   createData('Borussia Dortmund', 3, 3, 0, 0, 10,6,0,9),
//   createData('PSG', 3, 3, 0, 0, 10,6,0,9),
// ];



const Roster = (props) => {


  
  // const [playerRows,updatePlayerRows] = useState(null)
  const [allPlayers,updateAllPlayers] =useState(props.data)

  
  const [isLoading,updateIsLoading] = useState(true)
  
  
  

  useEffect(()=>{
    // console.log('Props in playerAllStats.js ->',props)

    // determineTeam(props.sheetStats.stats)
  },[])






  const classes = useStyles();

  let tableRender = allPlayers?allPlayers.map((row,index) => {
    if(row.points){
      
    return(
    <TableRow key={index}>
      <TableCell component="th" scope="row">
      {row.name}
      </TableCell>
      <TableCell align="right">{row.team}</TableCell>
      <TableCell align="right">{row.position}</TableCell>
      <TableCell align="right">{row.matchesPlayed}</TableCell>
      <TableCell align="right">{row.goals}</TableCell>
      <TableCell align="right">{row.assists}</TableCell>
      <TableCell align="right">{row.nutMegs}</TableCell>

      <TableCell align="right">{row.blocks}</TableCell>
      <TableCell align="right">{Math.round((row.points + Number.EPSILON)*100)/100}</TableCell>
    </TableRow>)}}):null

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">MP</TableCell>
            <TableCell align="right">Goals</TableCell>
            <TableCell align="right">Assists</TableCell>
            <TableCell align="right">Nutmegs</TableCell>
            <TableCell align="right">Blocks</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>


        <TableBody>
         {tableRender}
        </TableBody>

        
      </Table>
    </TableContainer>
  );
}

export default Roster