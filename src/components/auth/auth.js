import React, { Component } from 'react';
import { userAuth, getUser } from '../../actions/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class Auth extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.props.userAuth(values.code, values.state);
  }

  componentDidUpdate(prevProps) {
    const token = localStorage.getItem('token');
    if (this.props.isAuth !== prevProps.isAuth) {
      if (token) {
        this.props.getUser(token);
      }
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
  getUser: getUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
