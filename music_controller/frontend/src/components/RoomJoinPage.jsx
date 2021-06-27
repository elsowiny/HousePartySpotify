import React, { useState, useEffect } from 'react';
import {
  Button, Grid, Typography, TextField, FormControl, FormHelperText,
  Radio, RadioGroup, FormControlLabel
} from '@material-ui/core';
import { Link } from "react-router-dom";

import { useHistory } from "react-router";

function RoomJoinPage(props) {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);
  const handleTextFieldChange = (e) => {
      setRoomCode(e.target.value);
  }
  const handleButtonClick = (e) => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body : JSON.stringify({
        code: roomCode
      })
    };
      fetch('/api/join-room', requestOptions).then((response)=> {
        if (response.ok){
          history.push('/room/' + roomCode);
        }else{
          setError("room not found")
        }
      }).catch((error) =>
      console.log(error));
  }

  useEffect(() => {
    console.log(roomCode);
    
  })
    return (
      <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
    );
  }
  
  export default RoomJoinPage;
  