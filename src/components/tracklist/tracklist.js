import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaylistTracks } from '../../actions/actions';
import Loading from '../../pic/loading.svg';
import './tracklist.scss';

function msToMinAndSec(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function getRandomString() {
  const chars = ['A', '#'];
  const length = 10;
  let mask = '';
  if (chars.includes('a')) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.includes('A')) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.includes('#')) mask += '0123456789';
  if (chars.includes('!')) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

  let result = '';
  for (let i = 0; i < length; i = i + 1) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

class Tracklist extends Component {
  
  // playPreview(url) {
  //   new Audio(url).play();
  // }

  renderHeader() {
    console.log(this.props);
    const playlistImage = (
      <img
        className='playlist-image'
        src={this.props.tracks.playlist.images[0].url}
        alt={this.props.tracks.playlist.name}
      ></img>
    );
    const playlistName = <h1>{this.props.tracks.playlist.name}</h1>;
    const playlistDescription = (
      <p
        className='playlist-description'
        dangerouslySetInnerHTML={{
          __html: this.props.tracks.playlist.description,
        }}
      ></p>
    );
    const playlistTrackCount = <p className='playlist-trackcount'>{this.props.tracks.playlist.tracks.total} SONGS</p>;
    return (
      <React.Fragment>
        <div className='tracklist-header'>
          {playlistImage}
          <div className='tracklist-header_wrapper'>
            {playlistName}
            {playlistDescription}
            {playlistTrackCount}
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }

  renderTracks() {
    console.log(this.props.tracks.tracks);
    const tracklist = this.props.tracks.tracks.filter(item => item.track != null).map((item) => {
      console.log(item);
      const trackName = <div className='trackname'>{item.track && item.track.name}</div>;
      const albumName = <div className='albumname'>{item.track.album && item.track.album.name}</div>;

      const image = (
        <img
          className='track_image'
          src={item.track.album.images[2] && item.track.album.images[2].url}
          alt={item.track.name}
        ></img>
      );
      // const preview = item.track.preview_url;

      const artists = (
        <div className='artists'>
          {item.track.artists.map((artist, index) => (
            <span key={getRandomString()}>
              {`${artist.name}`}
              {index < item.track.artists.length - 1 ? ',\u00A0' : ''}
            </span>
          ))}
        </div>
      );

      const duration = <div className='duration'>{msToMinAndSec(item.track.duration_ms)}</div>;

      return (
        <React.Fragment key={getRandomString()}>
          <li className='track' onClick={() => this.playPreview(preview)}>
            {image}
            <div className='wrapper'>
              <div className='firstline'>{trackName}</div>
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
      );
    });

    const tracks = this.props.tracks.isTracksFetching ? <Loading /> : tracklist;
    const header = !this.props.tracks.playlist || this.props.tracks.playlist.length != 0 ? this.renderHeader() : null;

    return (
      <React.Fragment>
        {header}

        <ul>{tracks}</ul>
      </React.Fragment>
    );
  }

  render() {
    // let placeholder = <h2 className='placeholder'>Выберите плейлист</h2>;
    // if (this.props.tracks.tracks.length != 0 || this.props.tracks.isTracksFetching) {
    //   placeholder = null;
    // }
    // const list = this.renderTracks();

    let list = <h2 className='placeholder'>Выберите плейлист</h2>;
    if (this.props.tracks.tracks.length != 0 || this.props.tracks.isTracksFetching) {
      list = this.renderTracks();
    }
    return <div className='tracklist'>{list}</div>;
  }
}

const mapStateToProps = (state) => ({
  tracks: state.user.tracks,
});

const mapDispatchToProps = {
  getPlaylistTracks: getPlaylistTracks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);
