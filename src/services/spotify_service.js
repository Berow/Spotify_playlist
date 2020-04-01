import axios from 'axios';
import queryString from 'query-string';

function handleResponse(response) {
  // if (!response.status === 200) {
  if (response.status === 401) {
    // auto logout if 401 response returned from api
    // logout();
    refreshToken(localStorage.getItem('refresh_token'));

    const error = response.status;

    // eslint-disable-next-line no-throw-literal
    throw { error };
  }
  // }
  return response;
}

function login(code) {
  const client_id = 'ad8f1782d1874b0e9787a0cc7b7e68b1';
  const client_secret = '2d5872aea5994a1cb85a1aa517f3e6f5';

  return axios
    .post(
      'https://accounts.spotify.com/api/token',
      queryString.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:9000/auth/',
      }),
      {
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then(handleResponse)
    .then((response) => {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      return response;
    });
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('code');
}

const getUser = (token) => {
  return axios
    .get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(handleResponse)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
};

const getAllPlaylists = (token) => {
  return axios
    .get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(handleResponse)
    .then((response) => {      
      return response.data.items;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
};

function refreshToken(refreshToken) {
  const client_id = 'ad8f1782d1874b0e9787a0cc7b7e68b1';
  const client_secret = '2d5872aea5994a1cb85a1aa517f3e6f5';

  return axios
    .post(
      'https://accounts.spotify.com/api/token',
      queryString.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((response) => {
      console.log(response)
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      window.location.reload(true);
      return response;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
}

export const spotifyServices = {
  login,
  logout,
  refreshToken,
  getUser,
  getAllPlaylists,
};
