import axios from 'axios';
import queryString from 'query-string';
import { spotifyServices } from '../services/spotify_service';

import { history } from '../helpers';

const userAuth = (code, state) => {
  return (dispatch) => {
    dispatch({
      type: 'AUTH_REQUEST',
    });

    if (state != 'zh88psiu6') {
      dispatch({
        type: 'AUTH_FAIL',
        error: true,
        payload: new Error('State mismatch'),
      });
    } else {
      spotifyServices.login(code).then((response) => {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            token: response.access_token,
            refresh_token: response.refresh_token,
          },
        });
        (error) => {
          dispatch({
            type: 'AUTH_FAIL',
            error: true,
            payload: new Error('error'),
          });
        };
      });
    }
  };
};

const getUser = () => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_REQUEST',
    });
    spotifyServices.getUser().then((response) => {
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: response,
      });
      (error) => {
        dispatch({
          type: 'FETCH_FAIL',
          error: true,
          payload: new Error('error'),
        });
      };
    });
  };
};

const getAllPlaylists = () => {
  return (dispatch) => {
    dispatch({
      type: 'PLAYLISTS_FETCH_REQUEST',
    });
    spotifyServices.getAllPlaylists().then((items) => {
      dispatch({
        type: 'PLAYLISTS_FETCH_SUCCESS',
        payload: items,
      });
      (error) => {
        dispatch({
          type: 'PLAYLISTS_FETCH_FAIL',
          error: true,
          payload: new Error('error'),
        });
      };
    });
  };
};

const getPlaylistTracks = (url) => {
  return (dispatch) => {
    dispatch({
      type: 'TRACKS_FETCH_REQUEST',
    });
    spotifyServices.getPlaylistTracks(url).then((items) => {
      dispatch({
        type: 'TRACKS_FETCH_SUCCESS',
        payload: items,
      });
      (error) => {
        dispatch({
          type: 'TRACKS_FETCH_FAIL',
          error: true,
          payload: new Error('error'),
        });
      };
    });
  };
};

// const refreshToken = (token) => {
//   const client_id = 'ad8f1782d1874b0e9787a0cc7b7e68b1';
//   const client_secret = '2d5872aea5994a1cb85a1aa517f3e6f5';

//   return (dispatch) => {
//     dispatch({
//       type: 'REFRESH_REQUEST',
//     });
//     axios
//       .post(
//         'https://accounts.spotify.com/api/token',
//         queryString.stringify({
//           grant_type: 'refresh_token',
//           refresh_token: token,
//         }),
//         {
//           headers: {
//             Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
//           },
//         },
//       )
//       .then((response) => {
//         console.log(response);

//         localStorage.setItem('token', response.data.access_token);
//         // localStorage.setItem('refresh_token', response.data.refresh_token);

//         dispatch({
//           type: 'REFRESH_SUCCESS',
//           payload: response,
//         });
//       })
//       .catch(() => {
//         dispatch({
//           type: 'REFRESH_FAIL',
//           error: true,
//           payload: new Error('Wrong token'),
//         });
//       });
//   };
// };

const logout = () => {
  return () => {
    spotifyServices.logout();
    window.location.reload(true);
  };
};
export { userAuth, getUser, getAllPlaylists, logout, getPlaylistTracks };
