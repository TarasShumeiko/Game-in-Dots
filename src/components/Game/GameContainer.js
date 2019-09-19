import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { GameStatus } from '../../models';
import GameData from './GameData';
import GameField from './GameField';

const GameContainer = () => {
  const [mode, setMode] = useState(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState(GameStatus.INITIAL);

  return (
    <Grid container direction="column" alignItems="center" xs={8}>
      <Grid item>
        <GameData
          mode={mode}
          onSelectMode={setMode}
          name={name}
          onChangeName={setName}
          status={status}
          onChangeStatus={setStatus}
        />
      </Grid>
      {mode && (
        <Grid item>
          <GameField
            mode={mode}
            status={status}
            onChangeStatus={setStatus}
            key={mode.field}
          />
        </Grid>
      )}
    </Grid>
  )
};

export default GameContainer;
