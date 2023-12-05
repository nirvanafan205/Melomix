// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { callSpotifyAPI, addToPlaylist, getUserPlaylists } from '../api/spotifyAPI';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Dashboard.css'; // Import your custom styles

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [trackArray, setTrackArray] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [allUserPlaylists, setAllUserPlaylists] = useState([]);

  useEffect(() => {
    getUserPlaylists();
  }, []);

  const getUserPlaylists = async () => {
    try {
      const playlists = await getUserPlaylists();
      setAllUserPlaylists(playlists);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

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

  const playTrack = (track) => {
    setSelectedTrack(track);
  };

  const handleAddToPlaylist = async (trackId) => {
    try {
      const playlistResponse = await addToPlaylist(selectedPlaylistId, trackId);
      console.log(playlistResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const neonStyles = {
    primary: '#ff00ff',   // Neon Pink
    secondary: '#00ffff', // Neon Blue
    accent: '#800080',    // Neon Purple
  };

  return (
    <div className="tw-text-center tw-mt-2 tw-p-10">
        <h2 className="tw-text-left tw-mb-2 tw-ml-1 tw-text-2xl tw-animate-rainbow">Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="tw-w-full tw-p-2 tw-border-2 tw-border-purple-500 tw-rounded-full tw-text-center tw-text-purple-500 tw-font-bold tw-outline-none"
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
            <div key={track.id} className="album-container" onClick={() => handleAddToPlaylist(track.id)}>
              <div>
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="img-fluid rounded"
                />

                <div className='tw-flex tw-justify-center tw-items-center tw-mt-2 tw-flex-row'>
                  <select
                    className="tw-border-2 tw-border-purple-500 tw-rounded-full tw-text-center tw-text-purple-500 tw-font-bold tw-outline-none"
                    style={{ color: neonStyles.primary }}
                    onChange={(e) => setSelectedPlaylistId(e.target.value)}
                  >
                    <option value="">Select Playlist</option>
                    {allUserPlaylists?.map((playlist) => (
                      <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                    ))}
                  </select>
                  <button 
                    className='tw-ml-2 tw-bg-purple-500 tw-rounded-full tw-text-white tw-font-bold tw-p-2 tw-px-4 tw-outline-none tw-border-2 tw-border-purple-500 tw-border-solid'
                  >+</button>
                </div>
              </div>
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
    </div>
  );
}
