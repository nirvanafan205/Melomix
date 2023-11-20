// spotifyApi.js
const CID = "b8c6b5a6bf1647ab89b7cc581e48ff8b";
const CSECRET = "dd294268f14c4f23949c73d19d9c5609";

let accessToken = null;
let searchInput = "John";

async function getAccessToken() {
  const authorization = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${CID}&client_secret=${CSECRET}`,
  };

  const response = await fetch("https://accounts.spotify.com/api/token", authorization);
  const data = await response.json();
  accessToken = data.access_token;
  return accessToken;
}

async function callSpotifyAPI() {
  await getAccessToken();

  const data = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let artists = await data.json();
  // First Artist
  let artistID = artists.artists.items[0].id;
  console.log(artists);
  await getArtistTracks(artistID);
}

async function getArtistTracks(artistID) {
  const data = await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  let tracks = await data.json();
  let track = tracks.tracks[0].name;
  console.log(track);
}

export { getAccessToken, callSpotifyAPI, getArtistTracks };
