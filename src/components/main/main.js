import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, logout, getAllPlaylists, getPlaylistTracks } from '../../actions/actions';
import Card from '../card/card';
import './main.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { history } from '../../helpers/history';

import Auth from '../auth/auth';

class Main extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token != '') {
      this.props.getUser(token);
      this.props.getAllPlaylists(token);
      this.props.getPlaylistTracks("https://api.spotify.com/v1/playlists/4pylRY0ogA4JwC6CplYTxl/tracks");
      // const refresh_token = localStorage.getItem('refresh_token');
      // this.props.refreshToken(refresh_token);
    }

  }

  componentDidUpdate(prevProps) {

    if (this.props.isAuth !== prevProps.isAuth) {
      this.props.getUser();
      this.props.getAllPlaylists();
      // [""0""].tracks.href
      this.props.getPlaylistTracks("https://api.spotify.com/v1/playlists/4pylRY0ogA4JwC6CplYTxl/tracks");
    }
  }

  renderItems() {    

    console.log(this.props.playlists);

    const data = this.props.playlists.map((item) => {
        const label = item.name;
        return (
          <li>
            {label}
          </li>
        )
      })

    // return 
  }

  render() {
    const name = this.props.user_name;
    const img = this.props.user_img_url;

    const items = this.renderItems()

    const out = (e) => {
      this.props.logout();
    };

    return (
      <Router >
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
                {/* {items} */}
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
  user_name: state.user.user_name,
  user_img_url: state.user.user_img_url,
  isAuth: state.user.isAuth,
  playlists: state.user.playlists,
});

const mapDispatchToProps = {
  getUser: getUser,
  logout: logout,
  getAllPlaylists: getAllPlaylists,
  getPlaylistTracks: getPlaylistTracks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
