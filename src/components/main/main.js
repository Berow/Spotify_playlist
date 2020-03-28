import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../actions/actions";
import Card from '../card/card'
import "./main.css";
import { BrowserRouter as Router, Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';

import Auth from '../auth/auth'

class Main extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    console.log(token);
    this.props.fetchData(token);
  }

  render() {
    const name = this.props.user_name;
    const img = this.props.user_img_url;
    console.log(name, img);

    return (
      <Router>
        <Card img={img} name={name} />
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

const mapStateToProps = state => ({
  user_name: state.user.user_name,
  user_img_url: state.user.user_img_url,
});

const mapDispatchToProps = {
  fetchData: fetchData
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);