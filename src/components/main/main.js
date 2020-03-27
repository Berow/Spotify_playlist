import React, { Component } from "react";
import s from "./main.css";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import Auth from '../auth/auth'

class Main extends Component {

  componentDidMount() {
    // this.props.auth();
  }

  render() {
    return (      
        <Router>
          <Switch>
            <Route path="/" exact render={() =>
              <ul>
                <li>
                  <Link to="/auth">LOGIN</Link>
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