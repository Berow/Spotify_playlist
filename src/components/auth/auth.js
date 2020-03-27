import React, { Component } from "react";
import { userAuth } from "../../actions/actions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

// import Button from '../button/button'

class Auth extends Component {

    onBtnClick = e => {
        this.props.userAuth("https://accounts.spotify.com/authorize?client_id=ad8f1782d1874b0e9787a0cc7b7e68b1&response_type=code&redirect_uri=http://localhost:9000/auth/&scope=playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=zh88psiu6");
    }

    render() {
        return (
            <button onClick={this.onBtnClick}>Auth</button>
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