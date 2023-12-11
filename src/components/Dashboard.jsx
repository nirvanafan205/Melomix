// Dashboard.jsx
import React, { useState } from 'react';
import { callSpotifyAPI } from '../api/spotifyAPI';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Dashboard.css'; // Import your custom styles
import MyFooter from './footer/footer';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [trackArray, setTrackArray] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);


  //constant to keep track of lyrics card visibility===============================================================
  const [showLyricsCard, setShowLyricsCard] = useState(false);
  //setting lyrics
  const [lyrics, setLyrics] = useState('');

  const toggleLyricsCard = () => {
    setShowLyricsCard(!showLyricsCard);
  };

  const LyricsCard = ({ lyrics, isVisible}) => {
    return (
      <div style={{ backgroundColor: '#1c1c1c' }} className={`lyrics-card ${isVisible ? 'visible' : ''}` }>
        <div className="lyrics-content"  dangerouslySetInnerHTML={{ __html: lyrics }}>
        </div>
      </div>
    );
  };

  //trying lyrics stuff again// return the lyrics?
  const fetchSongLyrics = async (songTitle) => {
    const encodedSongTitle = encodeURIComponent(songTitle);

    try {
      const response = await fetch(`https://cool-azure-donut.glitch.me/scrape/${encodedSongTitle}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      const formattedLyrics = data.lyrics.replace(/\n/g, '<br/>');
      setLyrics(formattedLyrics);
    } catch (error) {
      console.error('lyrics error:', error);
      setLyrics('');
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
        console.error('Error fetching data:', error);
      }
    }
  };

  const playTrack = async (track) => {
    setSelectedTrack(track);
    console.log("im testing: " + track.name);
    await fetchSongLyrics(track.name);
  };

  const neonStyles = {
    primary: '#ff00ff',   // Neon Pink
    secondary: '#00ffff', // Neon Blue
    accent: '#800080',    // Neon Purple
  };



  return (
    <div className="dashboard-container container text-center mt-5">
      <h2 className="text-secondary">Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{ color: neonStyles.primary }}
        />
        <button
          type="submit"
          className="btn btn-purple mt-3"
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
              <h3 className="text-secondary mt-3">{track.name}</h3>
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

      <div>
        <h3 className="text-secondary mt-4">Selected Track</h3>
        {selectedTrack && (
          <div className="position-fixed bottom-0 left-0 w-100 text-center">
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
          </div>
        )}
      </div>

      {/* Lyrics Card Button */}
      <button onClick={toggleLyricsCard} className="btn btn-primary position-fixed bottom-0 end-0 m-3 lyrics-button">
        Show Lyrics
      </button>
      {/* Lyrics Card */}
      {showLyricsCard && <LyricsCard lyrics={lyrics} isVisible={showLyricsCard} />}
    </div>
  );
}
