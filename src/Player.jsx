import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
  // useState hook to manage the state of the play variable,
  // controls whether the Spotify player should be playing or not.
  const [play, setPLay] = useState(false);

  // useEffect hook to start playback when the trackUri changes
  // dependency array [trackUri] ensures that the effect runs whenever trackUri changes.
  useEffect(() => setPLay(true), [trackUri]);

  // Checking if there is no access token.
  // If there is no access token, component returns null; the player should not be rendered
  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPLay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
    /*
        SpotifyPlayer component retunrs the following props:
          token: The Spotify access token
          showSaveIcon: Indicates whether to show the save icon in the player
          callback: A callback function triggered when the player's state changes. it pauses playback if the player is not playing.
          play: The state variable controlling playback
          uris: An array of Spotify track URIs to play. It is set to [trackUri] if trackUri is provided, otherwise an empty array
    */
  );
};

export default Player;
