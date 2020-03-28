import React, { Component } from "react";
import { userAuth } from "../../actions/actions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class Auth extends Component {

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        localStorage.setItem('code', values.code);
        this.props.userAuth(values.code, values.state);
    }

    render() {
        return (
            <div>Auth</div>
        );
    }
}

const mapStateToProps = state => ({
    isAuth: state.user.isAuth,
});

const mapDispatchToProps = {
    userAuth: userAuth
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));