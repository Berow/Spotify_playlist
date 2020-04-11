import React, { Component } from 'react';
import Button from '../button/button';
import './modal.scss';

export default class Header extends Component {
  closeModal = (e) => {
    const modal = document.querySelector('.modal');
    const backdrop = document.querySelector('.backdrop');
    const tracklist = document.querySelector('.tracklist');
    const playlists = document.querySelector('.playlists');
    const header = document.querySelector('.header');

    modal.classList.remove('open');
    tracklist.classList.remove('blur');
    playlists.classList.remove('blur');
    header.classList.remove('blur');

    backdrop.style.display = 'none';
    setTimeout(() => {
      backdrop.classList.remove('open');
    }, 10);
  };
  render() {
    return (
      <React.Fragment>
        <div className='backdrop' onClick={this.closeModal}></div>
        <div className='modal'>
          <h2>Do you want to continue?</h2>
          <Button />
        </div>
      </React.Fragment>
    );
  }
}
