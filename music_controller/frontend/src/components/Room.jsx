import React, { useState, useEffect } from 'react';
import {Grid, Button, Typography } from '@material-ui/core';
// Import useParams
import { useParams } from "react-router-dom";

import { useHistory } from "react-router";
import CreateRoomPage from "./CreateRoomPage.jsx";

function Room(props) {
    const history = useHistory();
    let params = useParams();
    const defaultVotes = 2;
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotes] = useState(defaultVotes);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const roomCode = params.roomCode;
    
    const getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + roomCode)
            .then((response) =>{
              if(!response.ok){
                props.leaveRoomCallback();
                history.push('/');
              }
               return response.json()

                  }).then((data) => {
            setVotes(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);

        })
    }

    getRoomDetails();

    const leaveButtonPressed = () =>{
            const requestOptions = {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
            };
            fetch('/api/leave-room', requestOptions).then((_reponse)=>{
              props.leaveRoomCallback();
              history.push('/');
            });
    }


    const updateShowSettings = (value) =>{
        setShowSettings(value);
    }

    const renderSettingsButton = () =>{

      return (
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={() => setShowSettings(true) }>
            Settings
          </Button>
        </Grid>

      );

    }

    const renderSettings = () =>{ 
      return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <CreateRoomPage 
              update={true}
              votesToSkip={votesToSkip}
              guestCanPause={guestCanPause}
             roomCode={roomCode}
             updateCallBack={null}/>
            </Grid>
            <Grid item xs={12} align="center">
              <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false) } >
                Close 
              </Button>
            </Grid>
        </Grid>
      );
    }

    if(showSettings){
        return renderSettings();
    }
    return (
      
          <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                      Code: {roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center"> 
                <Typography variant="h5" component="h5">
                      Votes: {votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                <Typography variant="h5" component="h5">
                      Guest Can Pause: {guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                <Typography variant="h5" component="h5">
                      Host: {isHost.toString()}
                    </Typography>
                   </Grid>
                   {isHost ? renderSettingsButton() : null}
                <Grid item xs={12} align="center">
                        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                          Leave Room
                        </Button>
                   </Grid>
            
          </Grid>



    );
  }
  
  export default Room;
  
  /*
    
      <div className="Room">
          <h3>{roomCode}</h3>
           <p>Votes: {votesToSkip}</p>
           <p>Guest Can Pause: {guestCanPause.toString()}</p>
           <p>Host: {isHost.toString()}</p>
       
           <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
      </div>
  
  */