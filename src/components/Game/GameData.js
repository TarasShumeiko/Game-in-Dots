import React from 'react';
import { makeStyles, TextField, Button, Typography } from '@material-ui/core';
import { GameStatus } from '../../models';
import ModePicker from './ModePicker';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(2),
    width: 170,
  },
  button: {
    margin: theme.spacing(2),
    width: 140,
    height: 52,
    background: '#7B8D93',
    color: 'white',
  },
  message: {
    textAlign: 'center',
    margin: '2rem',
    color: '#4e6066',
  }
}));

const GameData = ({ mode, onSelectMode, name, onChangeName, status, onChangeStatus }) => {
  const classes = useStyles();

  return (
    <div>
      <ModePicker mode={mode} onSelectMode={onSelectMode} />

      <TextField
        label="Name"
        className={classes.textField}
        value={name}
        onChange={event => onChangeName(event.target.value)}
        variant="outlined"
      />

      {status === GameStatus.COMPLETED ? (
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => onChangeStatus(GameStatus.PLAYING)}
        >
          Play Again
        </Button>
      ) : (
        <Button
          variant="contained"
          disabled={!mode || !name}
          className={classes.button}
          onClick={() => onChangeStatus(GameStatus.PLAYING)}
        >
          Play
        </Button>
      )}

      {status === GameStatus.COMPLETED && (
        <Typography variant="h5" className={classes.message}>
          {name} won!
        </Typography>
      )}
    </div>
  );
};

export default GameData;
