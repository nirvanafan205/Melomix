// Dashboard.jsx
import React, { useState } from 'react';
import { callSpotifyAPI } from "../../server/api/spotifyAPI";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Dashboard.css'; // Import your custom styles

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [trackArray, setTrackArray] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);


  //constant to keep track of lyrics card visibility===============================================================
  const [showLyricsCard, setShowLyricsCard] = useState(false);
  //setting lyrics
  const [lyrics, setLyrics] = useState([]);

  const toggleLyricsCard = () => {
    setShowLyricsCard(!showLyricsCard);
  };

  const LyricsCard = ({ lyrics, isVisible }) => {
    return (
      <div style={{ backgroundColor: '#1c1c1c' }} className={`lyrics-card ${isVisible ? 'visible' : ''}`}>
        <div className="lyrics-content">
          {lyrics.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    );
  };

  //trying lyrics stuff again// return the lyrics?
  const fetchSongLyrics = async (songTitle) => {
    const encodedSongTitle = encodeURIComponent(songTitle);

    try {
      //change this when deployed
      const response = await fetch(`https://cool-azure-donut.glitch.me/scrape/${encodedSongTitle}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      const lines = data.lyrics.split('\n');
      setLyrics(lines);
    } catch (error) {
      console.error('lyrics error:', error);
      setLyrics([]);
    }
  };
  //--------------------------------------------------------------------------------------------------------------
  const handleSearch = async (e) => {
    e.preventDefault();

    if (search === "") {
      alert("Please enter a search term");
    } else {
      try {
        const tracksResponse = await callSpotifyAPI(search);
        let tracks = tracksResponse.tracks.items;
        setTrackArray(tracks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const playTrack = async (track) => {
    setSelectedTrack(track);
    console.log(track);
    await fetchSongLyrics(track.artists[0].name + " " + track.name);
  };

  const neonStyles = {
    primary: "#ff00ff", // Neon Pink
    secondary: "#00ffff", // Neon Blue
    accent: "#800080", // Neon Purple
  };



  return (
    <div className="tw-text-center tw-mt-2 tw-p-10">
      {/* Search Title Text */}
      <h2 className="tw-text-left tw-mb-2 custom-large-margin tw-text-2xl tw-animate-rainbow" id="searchText">Search</h2>
      {/* Search Bar */}
      <form onSubmit={handleSearch} id ="searchBox">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="tw-w-full tw-p-2 tw-border-2 tw-border-purple-500 tw-rounded-full tw-text-center tw-text-purple-500 tw-font-bold tw-outline-none"
          style={{
            color: neonStyles.primary,
            width: '75%', // Adjust the width as needed
            padding: '10px', // Adjust the padding as needed
            // Add any other styles as needed
          }}
        />
        <br></br>
        {/* Search Button */}
        <button
          style={{ backgroundColor: neonStyles.accent, width: '80pt'}}
          type="submit"
          className="btn btn-purple mt-3 tw-rounded-full tw-p-2 tw-text-center tw-text-purple-400 tw-font-bold tw-outline-none"
        >
          Search
        </button>
      </form>

      <div className="albums-container">
        {trackArray.length > 0 ? (
          trackArray.map((track) => (
            <div key={track.id} className="album-container">
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="img-fluid rounded"
              />
                            <h3 className="text-secondary mt-3" id='songName'>{track.name}</h3>
              <h3 className="text-secondary mt-3">{track.artists[0].name} | {track.album.name}</h3>
              
              <div className='tw-flex tw-justify-center tw-items-center tw-mt-2 tw-flex-row'>
                  <select
                    className="tw-border-2 tw-border-purple-500 tw-rounded-full tw-text-center tw-text-purple-500 tw-font-bold tw-outline-none"
                    style={{ color: neonStyles.primary }}
                    onChange={(e) => setSelectedPlaylistId(e.target.value)}
                  >
                    <option value="">Select Playlist</option>
                  </select>
                  <button 
                    className='tw-ml-2 tw-bg-purple-500 tw-rounded-full tw-text-white tw-font-bold tw-p-2 tw-px-4 tw-outline-none tw-border-2 tw-border-purple-500 tw-border-solid'
                  >+</button>
                </div>
              <button
                onClick={() => playTrack(track)}
                className="btn btn-purple"
              >
                Play
              </button>
            </div>
          ))
        ) : (
          <p className="text-secondary">No tracks found</p>
        )}
      </div>

      <div className="position-fixed bottom-0 left-0 text-center">
        {/* Lyrics Card */}
        {showLyricsCard && <LyricsCard lyrics={lyrics} isVisible={showLyricsCard} />}
        <div className="player-and-lyrics-container">
          {/* Lyrics Card Button */}{selectedTrack && (
            <button onClick={toggleLyricsCard} className="btn btn-primary lyrics-button">
              Show Lyrics
            </button>)}
          {/* Spotify Iframe */}
          {selectedTrack && (
            <iframe
              src={`https://open.spotify.com/embed/track/${selectedTrack.id}`}
              width="300"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
              title={`spotify-${selectedTrack.id}`}
              autoPlay
            ></iframe>
          )}


        </div>
      </div>
    </div>
  );
}
