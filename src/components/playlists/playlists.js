import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPlaylists, getPlaylistTracks } from '../../actions/actions';
import Loading from '../../pic/loading.svg';
import './playlists.scss'

class Playlists extends Component {
  componentDidMount() {
    if (this.props.auth.isAuth || localStorage.getItem('token') != '') {
      this.props.getAllPlaylists();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuth !== prevProps.auth.isAuth && this.props.auth.isAuth) {
      this.props.getAllPlaylists();
    }
  }

  // onPlaylistClick() {}

  renderPlaylist(playlist) {
    return playlist.map((item) => {
      const label = item.name;
      const id = item.id;
      const url = item.tracks.href;
      return (
        <li key={id} className='playlist' onClick={() => this.props.getPlaylistTracks(url)}>
          {label}
        </li>
      );
    });
  }

  render() {
    const playlists = this.props.playlists.isPlaylistsFetching ? (
      <Loading />
    ) : (
        this.renderPlaylist(this.props.playlists.playlists)
      );

    return <div className='playlists'>
      <div className='sticky'>
        <h3>Плейлисты</h3>
        <ul>
          {playlists}
        </ul>
      </div>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
  playlists: state.user.playlists,
});

const mapDispatchToProps = {
  getAllPlaylists: getAllPlaylists,
  getPlaylistTracks: getPlaylistTracks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
