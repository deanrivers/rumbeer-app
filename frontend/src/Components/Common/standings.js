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

function createData(team, mp, wins, draws, losses, gf, ga, gd , points) {
  return { team, mp, wins, draws, losses, gf, ga, gd , points };
}

// const rows = [
//   createData('Bayern', 3, 3, 0, 0, 10,6,0,9),
//   createData('Barcelona', 3, 3, 0, 0, 10,6,0,9),
//   createData('Borussia Dortmund', 3, 3, 0, 0, 10,6,0,9),
//   createData('PSG', 3, 3, 0, 0, 10,6,0,9),
// ];



const Standings = (props) => {

  const [leaguStandings,updateLeaguStandings] = useState(null)
  const [leagueRows,updateLeagueRows] = useState([])
  const [isLoading,updateIsLoading] = useState(true)

  useEffect(()=>{
    // console.log('Leage Standings Props ->',props)
    let tokenSession = localStorage.getItem('TOKEN');
    //console.log('Local storage in standings',tokenSession)
    

    if(leaguStandings){
      const rows = leaguStandings.map( item =>{
        return createData(item.team,item.matchesPlayed,item.wins,item.draws,item.losses,item.gf,item.ga,item.gd,item.points)
      })
      updateLeagueRows(rows)
      updateIsLoading(false)
    } else{
      
      //pass token from flask or session storage
      getLeagueStandings(props.token?props.token:tokenSession)
    }

  },[leaguStandings])

  const getLeagueStandings = token =>{
    fetch('/api/sheetStandings',{
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
      let sortedArr = data.standings
      // console.log('League Standing Data =>',sortedArr)
      
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

      sortedArr.sort(compare)

      // updateLeaguStandings(data.standings)
      updateLeaguStandings(sortedArr)
    })
    //let data = await response.json()

    
    
}


  const classes = useStyles();

  let tableRender = leagueRows.map((row) => (
    <TableRow key={row.team}>
      <TableCell component="th" scope="row">
        {row.team}
      </TableCell>
      <TableCell align="right">{row.mp}</TableCell>
      <TableCell align="right">{row.wins}</TableCell>
      <TableCell align="right">{row.draws}</TableCell>
      <TableCell align="right">{row.losses}</TableCell>
      <TableCell align="right">{row.gf}</TableCell>
      <TableCell align="right">{row.ga}</TableCell>
      <TableCell align="right">{row.gd}</TableCell>
      <TableCell align="right">{row.points}</TableCell>

    </TableRow>
  ))

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell align="right">MP</TableCell>
            <TableCell align="right">W</TableCell>
            <TableCell align="right">D</TableCell>
            <TableCell align="right">L</TableCell>
            <TableCell align="right">GF</TableCell>
            <TableCell align="right">GA</TableCell>
            <TableCell align="right">GD</TableCell>
            <TableCell align="right">Pts</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {isLoading?<PulseLoader
                        // css={override}
                        size={10}
                        color={"#FF0062"}
                        loading={isLoading}
                        
                    />:tableRender}

          
        </TableBody>

        
      </Table>
    </TableContainer>
  );
}

export default Standings