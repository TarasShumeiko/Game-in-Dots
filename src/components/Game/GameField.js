import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { SquareStatus, GameStatus } from '../../models';
import classNames from 'classnames';

const useStyles = makeStyles({
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
});

const getInitialSquares = squares => {
  return squares.flat().filter(square => square.status === SquareStatus.INITIAL);
};

const GameField = ({ mode, status, onChangeStatus, onSelectWinner, name }) => {
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

  const startGame = () => {
    onChangeStatus(GameStatus.PLAYING);
    let activeSquare;
    const gameInterval = setInterval(() => {
      if (activeSquare) {
        setSquares(prevState => {
          return prevState.map(outerArray => (
            outerArray.map(square => {
              if (
                square.x === activeSquare.x &&
                square.y === activeSquare.y &&
                square.status === SquareStatus.ACTIVE
              ) {
                return {...square, status: SquareStatus.FAILURE};
              }
              else return square;
            })
          ))
        });
      }
      setSquares(prevState => {
        const initialSquares = prevState.flat().filter(square => (
          square.status === SquareStatus.INITIAL
        ));
        const randomSquare = initialSquares[Math.floor(Math.random()*initialSquares.length)];
        return prevState.map(outerArray => (
          outerArray.map(square => {
            if (
              square &&
              randomSquare &&
              square.x === randomSquare.x &&
              square.y === randomSquare.y
            ) {
              activeSquare = {...square, status: SquareStatus.ACTIVE};
              return {...square, status: SquareStatus.ACTIVE};
            }
            else return square;
          })
        ))
      });
    }, mode.delay);
    setTimeout(() => {
      clearInterval(gameInterval);
      onChangeStatus(GameStatus.FINISHED);
    }, mode.delay * (getInitialSquares(squares).length + 1));
  };

  const selectSquare = (squareStatus) => {
    if (squareStatus === SquareStatus.ACTIVE) {
      setSquares(prevState => (
        prevState.map(outerArray => (
          outerArray.map(square => {
            if (square.status === squareStatus) {
              return {...square, status: SquareStatus.SUCCESS};
            } else {
              return square;
            }
          })
        ))
      ));
    }
  };

  const setInitialState = () => {
    setSquares(prevState => {
      onChangeStatus(GameStatus.STARTED);
      return prevState.map(outerArray => (
        outerArray.map(square => ({...square, status: SquareStatus.INITIAL}))
      ))
    });
  };

  if (status === GameStatus.STARTED) {
    startGame();
  }

  if (status === GameStatus.FINISHED) {
    const successSquares = squares.flat().filter(square => square.status === SquareStatus.SUCCESS);
    const initialSquares = squares.flat();
    successSquares.length > (initialSquares.length / 2) ?
      onSelectWinner({winner: name, date: new Date().toLocaleString()}) :
      onSelectWinner({winner: 'Computer', date: new Date().toLocaleString()});
    onChangeStatus(GameStatus.COMPLETED);
  }

  if (status === GameStatus.REPEATED) {
    setTimeout(() => {
      setInitialState();
    });
  }

  return (
    <Grid container direction="column" className={classes.column}>
      {squares.map((row, rowIndex) => (
        <Grid key={rowIndex} container>
          {row.map((square, squareIndex) => (
            <Grid
              key={squareIndex}
              onClick={() => selectSquare(square.status)}
              className={classNames(classes.square, {
                [classes.active]: square.status === SquareStatus.ACTIVE,
                [classes.success]: square.status === SquareStatus.SUCCESS,
                [classes.failure]: square.status === SquareStatus.FAILURE,
              })}
            />
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default GameField;
