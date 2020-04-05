import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, logout } from '../../actions/actions';
import Card from '../card/card';
import './main.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import Loading from '../../pic/loading.svg';
import { history } from '../../helpers/history';

import Auth from '../auth/auth';
import Tracklist from '../tracklist/tracklist';
import Playlists from '../playlists/playlists';

class Main extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token != '') {
      this.props.getUser(token);
    }
  }

  render() {
    const name = this.props.user.user_name;
    const img = this.props.user.user_img_url;

    // console.log(this.props.tracks.tracks);

    const out = (e) => {
      this.props.logout();
    };

    return (
      <Router>
        <Card img={img} name={name} />
        <Switch>
          <Route
            path='/'
            exact
            render={() => (
              <ul>
                <li>
                  <a href='https://accounts.spotify.com/authorize?client_id=ad8f1782d1874b0e9787a0cc7b7e68b1&response_type=code&redirect_uri=http://localhost:9000/auth/&scope=playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=zh88psiu6'>
                    LOGIN
                  </a>
                </li>
                <li>
                  <button onClick={out}>LOGOUT</button>
                </li>
                <hr></hr>
                <Playlists />
                <hr></hr>
                <Tracklist />
              </ul>
            )}
          />
          <Route path='/auth' exact component={Auth} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
  user: state.user.user,
});

const mapDispatchToProps = { getUser: getUser, logout: logout };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
