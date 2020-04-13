import React, { Component } from 'react';
import { userAuth } from '../../actions/actions';
import { connect } from 'react-redux';
import { withRouter, Redirect, ro } from 'react-router-dom';
import queryString from 'query-string';

class Auth extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.props.userAuth(values.code, values.state);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAuth !== prevProps.isAuth) {
      this.props.history.push('/');
    }
  }

  render() {
    return <div>Auth</div>;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.auth.isAuth,
});

const mapDispatchToProps = {
  userAuth: userAuth,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
