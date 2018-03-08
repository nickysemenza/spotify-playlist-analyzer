export const PUBLIC_URL = process.env.REACT_APP_FULL_URL;
export const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

export const SPOTIFY_AUTH_URL = `http://accounts.spotify.com/authorize?response_type=token&client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${PUBLIC_URL}/callback&scope=playlist-read-private`
