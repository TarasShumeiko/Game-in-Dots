import React from 'react';
import { Grid } from '@material-ui/core';
import Game from './components/Game/GameContainer';
import Board from './components/Board';

const App = () => {
  return (
    <Grid container justify="space-around">
      <Game />
      <Board />
    </Grid>
  );
};

export default App;
