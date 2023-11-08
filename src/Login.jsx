import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=5eb084a46a0a4ff9a4c885b1bdd130da&response_type=code&redirect_uri=http://localhost:5173/search&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const SpotifyAPI = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Spotify Login</h1>
      <a
        href={AUTH_URL}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Login with Spotify
      </a>
    </div>
  );
};

export default SpotifyAPI;
