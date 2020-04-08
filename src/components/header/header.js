import React, { Component } from 'react';
import { connect } from 'react-redux';

import './header.scss';

class Header extends Component {

    render() {
        const name = this.props.user.user_name;
        const img = this.props.user.user_img_url;
        return (
            <div className="header">
                <img className='avatar' src={img} alt={name}></img>
                <div className='name'>{name}</div >
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
});

export default connect(mapStateToProps)(Header);