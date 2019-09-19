import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { SquareStatus } from '../../models';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  column: {
    border: '2px solid #8d969a',
  },
  square: {
    border: '2px solid #8d969a',
    width: '45px',
    height: '45px',
  },
  active: {
    backgroundColor: 'blue',
  },
  success: {
    backgroundColor: 'green',
  },
  failure: {
    backgroundColor: 'red',
  },
}));

const getInitialSquares = squares => {
  return squares.flat(2).filter(square => square === SquareStatus.INITIAL);
};

const GameField = ({ mode, status, onChangeStatus }) => {
  const classes = useStyles();

  const [squares, setSquares] = useState(() =>
    new Array(mode.field)
      .fill(null)
      .map((row, rowIndex) =>
        new Array(mode.field)
          .fill(null)
          .map((square, squareIndex) => ({
            x: squareIndex,
            y: rowIndex,
            status: SquareStatus.INITIAL,
          })),
      ),
  );

  console.log('squares', squares);
  console.log(getInitialSquares(squares));

  return (
    <Grid container direction="column" className={classes.column}>
      {squares.map((row, rowIndex) => (
        <Grid key={rowIndex} container>
          {row.map((square, squareIndex) => (
            <Grid
              key={squareIndex}
              className={classNames(classes.square, {
                [classes.active]: square === SquareStatus.ACTIVE,
                [classes.success]: square === SquareStatus.SUCCESS,
                [classes.failure]: square === SquareStatus.FAILURE,
              })}
            />
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default GameField;
