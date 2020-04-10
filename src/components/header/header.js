import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/actions';
import Button from '../button/button'

import './header.scss';

class Header extends Component {
    componentDidMount() {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log(token);
            setTimeout(() => {
                this.login();
            }, 2500);
        }
    }

    closeModal = (e) => {
        const modal = document.querySelector(".modal");
        const backdrop = document.querySelector(".backdrop");
        const tracklist = document.querySelector(".tracklist");
        const playlists = document.querySelector(".playlists");
        const header = document.querySelector(".header");

        modal.classList.remove("open");
        tracklist.classList.remove("blur");
        playlists.classList.remove("blur");
        header.classList.remove("blur");

        backdrop.style.display = "none";
        setTimeout(() => {
            backdrop.classList.remove("open");
        }, 10);
    }

    login = (e) => {
        const modal = document.querySelector(".modal");
        const backdrop = document.querySelector(".backdrop");
        const tracklist = document.querySelector(".tracklist");
        const playlists = document.querySelector(".playlists");
        const header = document.querySelector(".header");

        modal.classList.add("open");
        tracklist.classList.add("blur");
        playlists.classList.add("blur");
        header.classList.add("blur");

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
        const header = <React.Fragment>
            <img className='avatar' src={img} alt={name}></img>
            <div className='name'>{name}</div>
            <button onClick={this.out}>LOGOUT</button>
        </React.Fragment>


        const login = localStorage.getItem('token') ? header : <button onClick={this.login}>LOGIN</button>;


        return (
            <React.Fragment>
                <div
                    className='backdrop' onClick={this.closeModal}>
                </div>
                <div className='modal'>
                    <h2>Do you want to continue?</h2>
                    <Button />
                </div>

                <div className="header">
                    {login}
                </div>
            </React.Fragment >

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    auth: state.user.auth,
});

const mapDispatchToProps = { logout: logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);