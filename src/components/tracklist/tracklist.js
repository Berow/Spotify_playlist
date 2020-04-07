import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylistTracks } from '../../actions/actions';
import Loading from '../../pic/loading.svg';
import './tracklist.scss'

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
      return <React.Fragment> <li key={id} className='track'>
        {label}
      </li>
        <hr />
      </React.Fragment>
    });

    // if (tracklist.length === 0) {
    //   return <span>Выберите плейлист</span>;
    // } else 

    const tracks = this.props.tracks.isTracksFetching ? <Loading /> : tracklist;

    return <React.Fragment>
      <h3>Треки</h3>
      <ul>
        {tracks}
      </ul>
    </React.Fragment>
  }

  render() {
    let placeholder = <h2 className='placeholder'>Выберите плейлист</h2>
    if (this.props.tracks.tracks.lenght === 0 || this.props.tracks.isTracksFetching)
      placeholder = null;

    const list = this.renderTracks(this.props.tracks.tracks);

    return <div className='tracklist'>      
      {list}
      {placeholder}
    </div>;
  }
}


const mapStateToProps = (state) => ({
  tracks: state.user.tracks,
});

const mapDispatchToProps = {
  getPlaylistTracks: getPlaylistTracks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);
