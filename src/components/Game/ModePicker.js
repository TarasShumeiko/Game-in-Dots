import React, { useRef, useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    width: 170,
  },
}));

const modes = [
  { key: 'easyMode', title: 'Easy' },
  { key: 'normalMode', title: 'Normal' },
  { key: 'hardMode', title: 'Hard' },
];

const ModePicker = ({ mode, onSelectMode }) => {
  const inputLabelEl = useRef(null);
  const [settings, setSettings] = useState(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const fetchSettings = async () => {
      const result = await fetch('http://starnavi-frontend-test-task.herokuapp.com/game-settings');
      const data = await result.json();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    setLabelWidth(inputLabelEl.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabelEl}>
        Pick game mode
      </InputLabel>
      <Select
        value={mode}
        onChange={event => onSelectMode(event.target.value)}
        labelWidth={labelWidth}
      >
        {settings && modes.map((item, index) => (
          <MenuItem value={settings[item.key]} key={index}>{item.title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModePicker;
