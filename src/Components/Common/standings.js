import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(team, mp, wins, draws, losses, gf, ga, gd , points) {
  return { team, mp, wins, draws, losses, gf, ga, gd , points };
}

const rows = [
  createData('Bayern', 3, 3, 0, 0, 10,6,0,9),
  createData('Barcelona', 3, 3, 0, 0, 10,6,0,9),
  createData('Borussia Dortmund', 3, 3, 0, 0, 10,6,0,9),
  createData('PSG', 3, 3, 0, 0, 10,6,0,9),

];

const Standings = () => {
  const classes = useStyles();

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
          {rows.map((row) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Standings