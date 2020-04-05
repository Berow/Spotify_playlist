import { Constants } from '../../constants/constants';

const initialState = {
  auth: {
    isAuth: false,
    isAuthFetching: false,
    token: '',
    refresh_token: '',
  },

  user: {
    user_name: '',
    user_img_url: '',
    isUserFetching: false,
  },

  playlists: {
    isPlaylistsFetching: false,
    playlists: [],
  },

  tracks: {
    isTracksFetching: false,
    tracks: [],
  },

  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.AUTH_REQUEST:
      return {
        ...state,

        auth: {
          ...state.auth,
          isAuthFetching: true,
        },
      };
    case Constants.AUTH_SUCCESS:
      return {
        ...state,

        auth: {
          ...state.auth,
          isAuth: true,
          isAuthFetching: false,
          token: action.payload.token,
          refresh_token: action.payload.refresh_token,
        },
      };
    case Constants.AUTH_FAIL:
      return {
        ...state,

        auth: {
          ...state.auth,
          isAuthFetching: false,
        },
        error: action.payload.message,
      };
    case Constants.USER_FETCH_REQUEST:
      return {
        ...state,

        user: {
          ...state.user,
          isUserFetching: true,
        },
      };
    case Constants.USER_FETCH_SUCCESS:
      return {
        ...state,

        user: {
          ...state.user,
          isUserFetching: false,
          user_name: action.payload.data.display_name,
          user_img_url: action.payload.data.images[0].url,
        },
      };
    case Constants.USER_FETCH_FAIL:
      return {
        ...state,

        user: {
          ...state.user,
          isUserFetching: false,
        },
        error: action.payload,
      };
    case Constants.PLAYLISTS_FETCH_REQUEST:
      return {
        ...state,

        playlists: {
          ...state.playlists,
          isPlaylistsFetching: true,
        },
        error: '',
      };
    case Constants.PLAYLISTS_FETCH_SUCCESS:
      return {
        ...state,

        playlists: {
          ...state.playlists,
          isPlaylistsFetching: false,
          playlists: action.payload,
        },
      };
    case Constants.PLAYLISTS_FETCH_FAIL:
      return {
        ...state,

        playlists: {
          ...state.playlists,
          isPlaylistsFetching: false,
        },
        error: action.payload,
      };
    case Constants.TRACKS_FETCH_REQUEST:
      return {
        ...state,

        tracks: {
          ...state.tracks,
          isTracksFetching: true,
        },
        error: '',
      };
    case Constants.TRACKS_FETCH_SUCCESS:
      return {
        ...state,

        tracks: {
          ...state.tracks,
          tracks: action.payload,
          isTracksFetching: false,
        },
      };
    case Constants.TRACKS_FETCH_FAIL:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          isTracksFetching: false,
        },
        error: action.payload,
      };

    // case 'REFRESH_REQUEST':
    //   return {
    //     ...state,
    //     isFetching: true,
    //     error: '',
    //   };
    // case 'REFRESH_SUCCESS':
    //   return {
    //     ...state,
    //     token: action.payload.token,
    //     refresh_token: action.payload.refresh_token,
    //   };
    // case 'REFRESH_FAIL':
    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
};

export default reducer;
