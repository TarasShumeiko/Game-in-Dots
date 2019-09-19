import React, { useState, useEffect } from 'react';
import Board from './Board';

const BoardContainer = () => {
  const [winners, setWinners] = useState(null);

  const fetchWinners = async () => {
    const result = await fetch('http://starnavi-frontend-test-task.herokuapp.com/winners');
    const data = await result.json();
    setWinners(data);
  };

  useEffect(() => {
    fetchWinners()
  }, []);

  return <Board winners={winners} />;
};

export default BoardContainer;
