import {
  INITIATE_LOGIN,
  SET_PLAYLIST_TRACKS,
    SET_PLAYLISTS,
    LOGOUT
} from '../actions/users';
import update from 'immutability-helper';
const INITIAL_STATE = {
  authenticated: false,
  token: null,
  expirationDate: null,
  playlists: [],
  playlist_tracks: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INITIATE_LOGIN:
      return {
        ...state,
        expirationDate: action.expirationDate,
        token: action.token,
        authenticated: true
      };
  case LOGOUT:
      return INITIAL_STATE;
    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists
      };
    case SET_PLAYLIST_TRACKS:
      return update(state, {
        playlist_tracks: {
          [action.uri]: { $set: action.tracks }
        }
      });

    default:
      return state;
  }
}
