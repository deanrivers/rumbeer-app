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


  const [teamPlayers,updateTeamPlayers] = useState(null)
  const [playerRows,updatePlayerRows] = useState(null)
  const [allPlayers,updateAllPlayers] =useState(props.sheetStats)

  const [teamPlayersDone,updateTeamPlayersDone] = useState(false)
  const [isLoading,updateIsLoading] = useState(true)
  
  
  

  useEffect(()=>{
    // console.log('Props in roster.js ->',props)
    determineTeam(props.sheetStats.stats)
  },[])


  useEffect(()=>{
    if(teamPlayers){
      // console.log('Team Players',teamPlayers)
      const rows = teamPlayers.map( item =>{
        
        return createData(item.name,item.position,item.matchesPlayed,item.goals,item.assists,item.nutMegs,item.blocks)
      })
      updatePlayerRows(rows)
      updateIsLoading(false)
    } 
  },[teamPlayers])

  const determineTeam = (players) =>{
    let teamPlayers = []
    for(let i=0;i<players.length;i++){
      if(players[i]["team"]===props.team){
        teamPlayers.push(players[i])
      }
    }
    updateTeamPlayers(teamPlayers)
    updateTeamPlayersDone(true)
    updateIsLoading(false)
  }



  const classes = useStyles();

  let tableRender = playerRows?playerRows.map((row,index) => {
    // console.log('Roster rows =>',row)
    //do not render admin
    if(row.player!=="ADMIN"){
    return(
    <TableRow key={index}>
      <TableCell component="th" scope="row">
      {index+1}. {row.player}
      </TableCell>
      <TableCell align="right">{row.position}</TableCell>
      <TableCell align="right">{row.mp}</TableCell>
      <TableCell align="right">{row.goals}</TableCell>
      <TableCell align="right">{row.assists}</TableCell>
      <TableCell align="right">{row.nutmegs}</TableCell>
      <TableCell align="right">{row.blocks}</TableCell>
    </TableRow>
  )}}):null

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">MP</TableCell>
            <TableCell align="right">Goals</TableCell>
            <TableCell align="right">Assists</TableCell>
            <TableCell align="right">Nutmegs</TableCell>
            <TableCell align="right">Blocks</TableCell>
          </TableRow>
        </TableHead>


        <TableBody>
          {isLoading?<PulseLoader
                        // css={override}
                        size={10}
                        color={"#FF0062"}
                        loading={teamPlayersDone}
                        
                    />:tableRender}
        </TableBody>

        
      </Table>
    </TableContainer>
  );
}

export default Roster