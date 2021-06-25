import React, { useState, useEffect } from 'react';
// Import useParams
import { useParams } from "react-router-dom";
import {
    Button
  } from '@material-ui/core';

  import { Link } from 'react-router-dom';
function Room() {
    let params = useParams();
    const defaultVotes = 2;
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotes] = useState(defaultVotes);
    const [isHost, setIsHost] = useState(false);

    const roomCode = params.roomCode;
    
    const getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + roomCode).then((response) =>
            response.json()
        ).then((data) => {
            setVotes(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);

        })
    }

    getRoomDetails();
    return (
      <div className="Room">
          <h3>{roomCode}</h3>
           <p>Votes: {votesToSkip}</p>
           <p>Guest Can Pause: {guestCanPause.toString()}</p>
           <p>Host: {isHost.toString()}</p>
       
           <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
      </div>
    );
  }
  
  export default Room;
  