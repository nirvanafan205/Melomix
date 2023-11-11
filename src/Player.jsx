import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
  const [play, setPLay] = useState(false);

  useEffect(() => setPLay(true), [trackUri]);
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
  );
};

export default Player;
