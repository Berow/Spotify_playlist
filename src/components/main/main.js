import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/actions';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';

import Header from '../header/header';
import Tracklist from '../tracklist/tracklist';
import Playlists from '../playlists/playlists';
import Auth from '../auth/auth';
import './main.scss';

class Main extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getUser(token);
    }
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <Switch>
            <Route path='/' exact
              render={() => (
                <React.Fragment>
                  <Header />
                  <Playlists />
                  <Tracklist />
                </React.Fragment>
              )} />

            <Route path='/auth' exact component={Auth} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
  user: state.user.user,
});

const mapDispatchToProps = { getUser: getUser };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
