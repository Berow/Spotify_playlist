import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/actions';

import './header.scss';

class Header extends Component {

    login = (e) => {
        const modal = document.querySelector(".modal");
        const backdrop = document.querySelector(".backdrop");
        modal.classList.add("open");
        backdrop.style.display = "block";
        setTimeout(() => {
            backdrop.classList.add("open");
        }, 10);
    };

    out = (e) => {
        this.props.logout();
    };

    render() {

        const name = this.props.user.user_name;
        const img = this.props.user.user_img_url;

        return (
            <div className="header">
                <div className='backdrop' style={{ display: 'none' }}>
                    <div className='modal'>
                        <h2>Do you want to continue?</h2>
                        <a href='https://accounts.spotify.com/authorize?client_id=ad8f1782d1874b0e9787a0cc7b7e68b1&response_type=code&redirect_uri=http://localhost:9000/auth/&scope=playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private&state=zh88psiu6'>
                            LOGIN
                        </a>
                    </div>
                </div>

                <img className='avatar' src={img} alt={name}></img>
                <div className='name'>{name}</div>

                <button onClick={this.login}>LOGIN</button>
                <button onClick={this.out}>LOGOUT</button>
            </div>


        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    auth: state.user.auth,
});

const mapDispatchToProps = { logout: logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);