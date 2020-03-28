import React, { Component } from "react";
import s from "./main.css";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import Auth from '../auth/auth'

class Main extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() =>
            <ul>
              <li>
                <a href="https://accounts.spotify.com/authorize?client_id=ad8f1782d1874b0e9787a0cc7b7e68b1&response_type=code&redirect_uri=http://localhost:9000/auth/&scope=playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=zh88psiu6">LOGIN</a>
              </li>
            </ul>
          } />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Router>
    );
  }
}


export default Main;