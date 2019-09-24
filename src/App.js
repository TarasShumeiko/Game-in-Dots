import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Game from './components/Game/GameContainer';
import Board from './components/Board';

const App = () => {
  const [winnerData, setWinnerData] = useState('');

  const postWinner = async (winner) => {
    await fetch('http://starnavi-frontend-test-task.herokuapp.com/winners', {
      method: 'POST',
      body: JSON.stringify(winner),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  useEffect(() => {
    if (winnerData) {
      postWinner(winnerData)
    }
  });

  return (
    <Grid container justify="space-around">
      <Game winnerData={winnerData} onSelectWinner={setWinnerData} />
      <Board />
    </Grid>
  );
};

export default App;
