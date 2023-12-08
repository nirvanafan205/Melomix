const CID = "b8c6b5a6bf1647ab89b7cc581e48ff8b";
const CSECRET = "dd294268f14c4f23949c73d19d9c5609";

let accessToken = null;
let tracks = null;

async function getAccessToken() {
  const authorization = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${CID}&client_secret=${CSECRET}&scope=user-read-playback-state`,

  };

  const response = await fetch("https://accounts.spotify.com/api/token", authorization);
  const data = await response.json();
  accessToken = data.access_token;
  return accessToken;
}

async function callSpotifyAPI(searchInput) {
  await getAccessToken();

  const data = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let tracks = await data.json();
  console.log("test ",tracks.tracks);
  //await getArtistTracks(artistID);
  return tracks
}

async function getArtistTracks(artistID) {
  const data = await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  tracks = await data.json();
  let track = tracks.tracks[0].name;
  console.log(track);
}


//get artist details from artist name for now
//get artist from name, return a list of artist found
async function getArtistFromName(name, limit){
  await getAccessToken();

  const encodedArtistName = encodeURIComponent(name);

  const data = await fetch(`https://api.spotify.com/v1/search?q=${encodedArtistName}&type=artist&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await data.json();

  return result;
}

export { getAccessToken, callSpotifyAPI, getArtistTracks, getArtistFromName };
