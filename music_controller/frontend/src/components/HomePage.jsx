import React from 'react';
import RoomJoinPage from "./RoomJoinPage.jsx";
import CreateRoomPage from "./CreateRoomPage.jsx";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

function HomePage(props) {
    return (
      <Router>
        <Switch>
          <Route exact path="/"><p>This is the home page</p></Route>
          <Route exact path="/join" component={RoomJoinPage}></Route>
          <Route exact path="/create" component={CreateRoomPage}></Route>

        </Switch>
      </Router>
    );
  }
  
  export default HomePage;
  