import { persistLocally, paginateAPIFetch } from './index';

export const INITIATE_LOGIN = 'INITIATE_LOGIN';
export const LOGOUT = 'LOGOUT';
export function initiateLoginFromCallback(callbackdata) {
  // console.log(callbackdata);
  let token = callbackdata.access_token;
  let currentTimeMs = Math.round(new Date().getTime() / 1000);
  let expirationDate = currentTimeMs + parseInt(callbackdata.expires_in, 10) * 10;
  if(currentTimeMs < expirationDate) {
     persistLocally('userdata', callbackdata);
    return { type: INITIATE_LOGIN, expirationDate, token };
  } else {
      console.log("expired token!");
      return {type: LOGOUT }
  }
}
export function logout() {
    persistLocally('userdata',null);
    return {type: LOGOUT};
}
export const GET_PLAYLISTS = 'GET_PLAYLISTS';
export function getPlaylists() {
  return (dispatch, getState) => {
    paginateAPIFetch('me/playlists').then(playlists => {
      dispatch(setPlaylists(playlists));
    });
  };
}
export const SET_PLAYLISTS = 'SET_PLAYLISTS';
function setPlaylists(playlists) {
  return {
    type: SET_PLAYLISTS,
    playlists
  };
}

export function fetchPlaylistTracks(uri) {
  return dispatch => {
    let splitURI = uri.split(':');
    let userId = splitURI[2];
    let playlistId = splitURI[4];
    paginateAPIFetch(
      `users/${userId}/playlists/${playlistId}/tracks`
    ).then(tracks => {
      // dispatch(setPlaylists(playlists));
      console.log(tracks);
      dispatch(setPlaylistTracks(uri, tracks));
    });
  };
}

export const SET_PLAYLIST_TRACKS = 'SET_PLAYLIST_TRACKS';
function setPlaylistTracks(uri, tracks) {
  return {
    type: SET_PLAYLIST_TRACKS,
    uri,
    tracks
  };
}
