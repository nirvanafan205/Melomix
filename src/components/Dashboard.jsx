import React, { useState } from 'react';
import { callSpotifyAPI } from '../api/spotifyAPI';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [trackArray, setTrackArray] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

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

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Tracks</h3>
        {trackArray.length > 0 ? (
          <ul>
            {trackArray.map((track) => (
              <li key={track.id}>
                <div>
                  <img width="200" src={track.album.images[0].url} alt={track.name} />
                  <p>{track.name}</p>
                  <button onClick={() => playTrack(track)}>Play</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tracks found</p>
        )}
      </div>

      <div>
        <h3>Selected Track</h3>
        {selectedTrack && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', textAlign: 'center' }}>
          
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
