import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import notFoundPic from '../../pic/404.jpg';

import './404.scss';

class NotFound extends Component {
  render() {
    return (
      <div className='notFound'>
        {<img src={notFoundPic}></img>}
        <h1>PAGE NOT FOUND</h1>
        <button className='goBack_button' onClick={() => this.props.history.push('/')}>
          GO BACK
        </button>
      </div>
    );
  }
}

export default withRouter(NotFound);
