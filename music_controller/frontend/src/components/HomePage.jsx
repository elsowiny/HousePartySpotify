import React, {useState, useEffect} from 'react';
import RoomJoinPage from "./RoomJoinPage.jsx";
import CreateRoomPage from "./CreateRoomPage.jsx";
import Room from "./Room.jsx";
import { Grid, Button, ButtonGroup, Typography} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

function HomePage(props) {
  const [roomCode, setRoomCode] = useState(null);
  function  renderHomePage(){
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" compact="h3">
              House Party!!
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/join" component={Link}>Join a Room</Button>
              <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      )
  }

  useEffect(() => {

    async function  isUserInRoom(){
        await fetch('/api/user-in-room')
          .then((response)=> response.json())
          .then((data)=>{
                setRoomCode(data.code);
        });
    }
    isUserInRoom();
  },[]);


    return (
      <Router>
        <Switch>
          <Route exact path="/" render={()=>{
                return roomCode ? (<Redirect to={`/room/`+roomCode}/>) : renderHomePage();
          }}></Route>
                  <Route exact path="/join" component={RoomJoinPage}></Route>
                  <Route exact path="/create" component={CreateRoomPage}></Route>
                  <Route path="/room/:roomCode" component={Room}></Route>

        </Switch>
      </Router>
    );
  }
  
  export default HomePage;
  