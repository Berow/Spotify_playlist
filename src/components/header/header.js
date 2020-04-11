import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/actions';
import Modal from '../modal/modal';

import './header.scss';

class Header extends Component {
  state = {
    showMenu: false,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log(token);
      setTimeout(() => {
        this.login();
      }, 1500);
    }
  }

  login = (e) => {
    const modal = document.querySelector('.modal');
    const backdrop = document.querySelector('.backdrop');
    const tracklist = document.querySelector('.tracklist');
    const playlists = document.querySelector('.playlists');
    const header = document.querySelector('.header');

    modal.classList.add('open');
    tracklist.classList.add('blur');
    playlists.classList.add('blur');
    header.classList.add('blur');

    backdrop.style.display = 'block';
    setTimeout(() => {
      backdrop.classList.add('open');
    }, 10);
  };

  out = (e) => {
    this.props.logout();
  };

  render() {
    const name = this.props.user.user_name;
    const img = this.props.user.user_img_url;
    const header = (
      <ul
        className='menu'
        onMouseEnter={() => this.setState({ showMenu: true })}
        onMouseLeave={() => this.setState({ showMenu: false })}
      >
        <li className='card'>
          <img className='avatar' src={img} alt={name}></img>
          <div className='name'>{name}</div>
        </li>

        {this.state.showMenu && (
          <li>
            <hr />
            <a className='logout' onClick={this.out}>
              LOGOUT
            </a>
          </li>
        )}
      </ul>
    );

    const login = localStorage.getItem('token') ? (
      header
    ) : (
      <a className='login' onClick={this.login}>
        LOGIN
      </a>
    );

    return (
      <React.Fragment>
        <Modal />

        <div className='header'>{login}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  auth: state.user.auth,
});

const mapDispatchToProps = { logout: logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
