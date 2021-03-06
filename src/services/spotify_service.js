import axios from 'axios';
import queryString from 'query-string';

function handleResponse(response) {

  if (response.status != 200) {

    if (response.status === 401 && localStorage.getItem('refresh_token') === undefined) { 
      // auto logout if 401 response returned from api          
      logout();
    }
    if (response.status === 401) {
      refreshToken(localStorage.getItem('refresh_token'));
    }
    logout();
    throw response;
  }

  return response;
}


function getData(url) {
  const token = localStorage.getItem('token');

  return axios
    .get(url, {
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
    }
    );
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('code');
}

async function getUser() {
  const res = await getData('https://api.spotify.com/v1/me/');
  return res;
}

async function getAllPlaylists() {
  const res = await getData('https://api.spotify.com/v1/me/playlists');
  console.log(res.data.items);
  return res.data.items;
}

async function getPlaylistTracks(url) {
  const tracks = [];
  let res = await getData(url);
  res.data.items.forEach((item) => {
    tracks.push(item);
  });

  while (res.data.next !== null) {
    res = await getData(res.data.next);
    res.data.items.forEach((item) => {
      tracks.push(item);
    });
  }

  return tracks;
}

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
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      window.location.reload(true);
      return response;
    })
    .catch((error) => {
      handleResponse(error);
    });
}

export const spotifyServices = {
  login,
  logout,
  refreshToken,
  getUser,
  getAllPlaylists,
  getPlaylistTracks,
};
