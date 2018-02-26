import Cookies from 'js-cookie';
import QueryString from 'query-string';

export function persistLocally(key, value) {
  Cookies.set(key, JSON.stringify(value));
}
export function getLocally(key) {
  let data = Cookies.get(key);
  return data === undefined ? undefined : JSON.parse(data);
}

export function spotifyAPIFetch(endpoint, offset = 0, limit = 50) {
  let options = { headers: {} };

  let qs = QueryString.stringify({ offset, limit });
  let token = getLocally('userdata').access_token;
  if (token) options.headers['Authorization'] = `Bearer ${token}`;

  return fetch(`https://api.spotify.com/v1/${endpoint}?${qs}`, options).then(
    response => response.json()
  );
}

export async function paginateAPIFetch(endpoint) {
  let results = [];
  let offset = 0;
  do {
    const body = await spotifyAPIFetch(endpoint, offset);
    if (body.next) {
      let n = QueryString.parseUrl(body.next);
      console.log('hi', body, n);
      offset = n.query.offset;
    } else {
      offset = null;
    }
    results = results.concat(body.items);
  } while (offset);
  return results;
}
