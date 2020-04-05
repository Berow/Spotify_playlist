import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylistTracks } from '../../actions/actions';
import Loading from '../../pic/loading.svg';

class Tracklist extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.tracks.tracks !== prevProps.tracks.tracks) {
      this.renderTracks(this.props.tracks.tracks);
    }
  }
  renderTracks(data) {
    const tracklist = data.map((item) => {
      const label = item.track.name;
      const id = item.track.id;
      return <li key={id}>{label}</li>;
    });

    if (tracklist.length === 0) {
      return <span>Select a item from a list</span>;
    } else {
      const tracks = this.props.tracks.isTracksFetching ? <Loading /> : tracklist;
      return tracks;
    }
  }

  render() {
    const list = this.renderTracks(this.props.tracks.tracks);
    return <React.Fragment>{list}</React.Fragment>;
  }
}

const mapStateToProps = (state) => ({
  tracks: state.user.tracks,
});

const mapDispatchToProps = {
  getPlaylistTracks: getPlaylistTracks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);
