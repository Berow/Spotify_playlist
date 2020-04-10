import React, { Component } from "react";
import './button.scss';

export default class Button extends Component {
    render() {
        return <a href='https://accounts.spotify.com/authorize?client_id=ad8f1782d1874b0e9787a0cc7b7e68b1&response_type=code&redirect_uri=http://localhost:9000/auth/&scope=playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=zh88psiu6' className="button">LOGIN</a>
    }
}