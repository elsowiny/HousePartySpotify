import React, { useState, useEffect } from 'react';
import {
  Button, Grid, Typography, TextField, FormControl, FormHelperText,
  Radio, RadioGroup, FormControlLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

function CreateRoomPage(props) {
  

  const defaultVotes = 2;
  const history = useHistory();
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotes] = useState(2);
  //const [state, setState] = useState(initialState);

  const handleVotesChange = (e) => {
    setVotes(e.target.value);
  }
  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);

  }
  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause
      }),
    };

    fetch('/api/create-room', requestOptions).then((response) => 
        response.json()
    ).then((data) => 
          history.push('/room/' + data.code));
    
    console.log('hey ms jackson');
  
  }

  useEffect(() => {
    console.log(votesToSkip);
    console.log(guestCanPause);
  })

  const title = props.update ? 'Update Room' : 'Create Room';


  const renderCreateButtons = () => {
    return(
    <Grid container spacing={1}>
    <Grid item xs={12} align="center">
        <Button color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >Create A Room</Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
      </Grid>
      </Grid>)
  }

  const renderUpdateButtons = () => {
    return(
    
    <Grid item xs={12} align="center">
        <Button color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >Update Room</Button>
      </Grid>
      )
  }

  return (
    
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl component="fieldset" >
          <FormHelperText component="div">
            <div align="center">
              Guest Control of Playback State
            </div>
          </FormHelperText>
          <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
            <FormControlLabel value="true" control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom" />
            <FormControlLabel value="false" control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <TextField required={true}
            type="number"
            defaultValue={votesToSkip}
            inputProps={{ min: 1, }}
            onChange={handleVotesChange} />
          <FormHelperText component="div">
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      
      {props.update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>

  );
}


export default CreateRoomPage;
