import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  message: {
    margin: theme.spacing(2),
    color: '#4e6066',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2px',
    padding: '1rem',
    background: '#CFD8DC',
    color: '#8d969a',
    fontSize: '1.5rem',
    '& span': {
      marginRight: '2rem',
    },
  },
}));

const Board = ({ winners }) => {
  const classes = useStyles();

  return (
    <Grid xs={4}>
      <Typography variant="h2" className={classes.message}>
        Leader Board
      </Typography>
      {winners && winners.map(winner => {
        return (
          <div key={winner.id} className={classes.card}>
            <span>{winner.winner}</span>
            <span>{winner.date}</span>
          </div>
        )
      })}
    </Grid>
  );
};

export default Board;
