import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { GameStatus } from '../../models';
import GameData from './GameData';
import GameField from './GameField';

const GameContainer = ({ onSelectWinner, winnerData }) => {
  const [mode, setMode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(GameStatus.INITIAL);

  return (
    <Grid container item direction="column" alignItems="center" xs={8}>
      <Grid item>
        <GameData
          mode={mode}
          onSelectMode={setMode}
          name={name}
          onChangeName={setName}
          status={status}
          onChangeStatus={setStatus}
          winnerData={winnerData}
        />
      </Grid>
      {mode && (
        <Grid item>
          <GameField
            mode={mode}
            status={status}
            onChangeStatus={setStatus}
            key={mode.field}
            onSelectWinner={onSelectWinner}
            name={name}
          />
        </Grid>
      )}
    </Grid>
  )
};

export default GameContainer;
