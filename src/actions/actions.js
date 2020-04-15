import { spotifyServices } from '../services/spotify_service';
import { Constants } from '../constants/constants';

const userAuth = (code, state) => {
  return (dispatch) => {
    dispatch({
      type: Constants.AUTH_REQUEST,
    });

    if (state != 'zh88psiu6') {
      dispatch({
        type: Constants.AUTH_FAIL,
        error: true,
        payload: new Error('State mismatch'),
      });
    } else {
      spotifyServices.login(code).then(response => {
        dispatch({
          type: Constants.AUTH_SUCCESS,
          payload: {
            token: response.access_token,
            refresh_token: response.refresh_token,
          },
        }),
        error => {
          console.log(error);
          dispatch({
            type: Constants.AUTH_FAIL,
            payload: error,
          });
        };
      });
    }
  };
};

const getUser = () => {
  return (dispatch) => {
    dispatch({
      type: Constants.USER_FETCH_REQUEST,
    });
    spotifyServices.getUser().then((response) => {
      console.log(response);
      dispatch({
        type: Constants.USER_FETCH_SUCCESS,
        payload: response,
      });
      (error) => {
        dispatch({
          type: Constants.USER_FETCH_FAIL,
          error: true,
          payload: new Error(error),
        });
      };
    });
  };
};

const getAllPlaylists = () => {
  return (dispatch) => {
    dispatch({
      type: Constants.PLAYLISTS_FETCH_REQUEST,
    });
    spotifyServices.getAllPlaylists().then((items) => {
      dispatch({
        type: Constants.PLAYLISTS_FETCH_SUCCESS,
        payload: items,
      });
      (error) => {
        dispatch({
          type: Constants.PLAYLISTS_FETCH_FAIL,
          error: true,
          payload: new Error(error),
        });
      };
    });
  };
};

const getPlaylistTracks = (url, playlist) => {
  return (dispatch) => {
    dispatch({
      type: Constants.TRACKS_FETCH_REQUEST,
    });
    spotifyServices.getPlaylistTracks(url).then((items) => {
      dispatch({
        type: Constants.TRACKS_FETCH_SUCCESS,
        payload: { items, playlist },
      });
      (error) => {
        dispatch({
          type: Constants.TRACKS_FETCH_FAIL,
          error: true,
          payload: new Error(error),
        });
      };
    });
  };
};

const logout = () => {
  return (dispatch) => {
    dispatch({
      type: Constants.USER_LOGGED_OUT,
    });
    spotifyServices.logout();
    window.location.reload(true);
  };
};
export { userAuth, getUser, getAllPlaylists, logout, getPlaylistTracks };
