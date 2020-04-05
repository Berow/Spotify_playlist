import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPlaylists, getPlaylistTracks } from '../../actions/actions';
import Loading from '../../pic/loading.svg';

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
        <li key={id} onClick={() => this.props.getPlaylistTracks(url)}>
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

    return <React.Fragment>{playlists}</React.Fragment>;
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
