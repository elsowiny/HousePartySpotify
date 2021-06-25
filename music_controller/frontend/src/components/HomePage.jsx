import React from 'react';
import RoomJoinPage from "./RoomJoinPage.jsx";
import CreateRoomPage from "./CreateRoomPage.jsx";
import Room from "./Room.jsx";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

function HomePage(props) {
    return (
      <Router>
        <Switch>
          <Route exact path="/"><div><p>This is the home page</p></div></Route>
                  <Route exact path="/join" component={RoomJoinPage}></Route>
                  <Route exact path="/create" component={CreateRoomPage}></Route>
                  <Route path="/room/:roomCode" component={Room}></Route>

        </Switch>
      </Router>
    );
  }
  
  export default HomePage;
  