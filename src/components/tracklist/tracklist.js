import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylistTracks } from '../../actions/actions';
import Loading from '../../pic/loading.svg';
import './tracklist.scss';

function msToMinAndSec(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

class Tracklist extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.tracks.tracks !== prevProps.tracks.tracks) {
      this.renderTracks(this.props.tracks.tracks);
    }
  }
  renderTracks(data) {
    console.log(data)
    const tracklist = data.map((item) => {
      const trackName = <div className='trackname'>{item.track.name}</div>;
      const albumName = <div className='albumname'>{item.track.album.name}</div>;
      const image = <img className='image' src={item.track.album.images[2].url} alt={item.track.name}></img>;

      const artists = <div className='artists'>{item.track.artists.map((artist, index) => <span>{`${artist.name}`}{index < item.track.artists.length - 1 ? ',\u00A0' : ''}</span>)}</div>;
      const duration = <div className='duration'>{msToMinAndSec(item.track.duration_ms)}</div>;
      const id = item.track.id;

      return <React.Fragment>

        <li key={id} className='track'>
          {image}
          <div className='wrapper'>
            <div className='firstline'>
              {trackName}
              
            </div>
            <div className='secondline'>
              {artists}
              <span className='separator'>•</span>
              {albumName}
            </div>            
          </div>
          {duration}
        </li>

        <hr />
      </React.Fragment>
    });

    const tracks = this.props.tracks.isTracksFetching ? <Loading /> : tracklist;

    return <React.Fragment>
      <h3>Треки</h3>
      <ul >
        {tracks}
      </ul>
    </React.Fragment>
  }

  render() {
    let placeholder = <h2 className='placeholder'>Выберите плейлист</h2>;
    if (this.props.tracks.tracks.length != 0 || this.props.tracks.isTracksFetching) {
      placeholder = null;
    }
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
