import React, { useState } from 'react'
import { callSpotifyAPI } from '../api/spotifyAPI';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const[trackArray, setTrackArray] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault();

    if(search === ""){
      alert("bruhhhh")
    }else{

      try {
        const tracksResponse = await callSpotifyAPI(search)
        let tracks = tracksResponse.tracks.items
        setTrackArray(tracks);
        console.log(trackArray)
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

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
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      ) : (
        <p>No tracks found</p>
      )}
    </div>
  </div>
  );
}
