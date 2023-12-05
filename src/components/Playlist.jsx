// src/Playlist.js

import { getAccessToken, getSpotifyUser } from '../api/spotifyAPI';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Playlist.css'; // Import the CSS file

const baseUrl = 'https://api.spotify.com/v1';

const Playlist = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); // [1
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  console.log('user', user)
  console.log('accessToken', accessToken)

  useEffect(() => {

    // Get access token is async so we need to await
    async function getAccessTokenAsync() {
      const token = await getAccessToken();
      return token;
    }

    async function getUserAsync() {
      const user = await getSpotifyUser();
      return user;
    }

    // Call the async function
    getAccessTokenAsync().then((token) => {
      setAccessToken(token);
    });

    getUserAsync().then((user) => {
      setUser(user);
    });

  }, []);

  const getUserPlaylists = async (accessToken) => {
    const response = await axios.get(`${baseUrl}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.items;
  };

  const createPlaylist = async () => {
    console.log('accessToken', accessToken)
    console.log('playlist name', newPlaylistName)
    try {
      const response = await axios.post(
        `${baseUrl}/me/playlists`,
        {
          name: newPlaylistName,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const newPlaylist = response.data;
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');

      // Use newPlaylist.uri to get the URI for the created playlist
      console.log('New Playlist URI:', newPlaylist.uri);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="container">
      {accessToken && (
        <div>
          <h1 className='tw-text-zinc-50 tw-mt-5 tw-animate-rainbow'>Your Playlists</h1>
          <ul>
            {playlists.map((playlist) => (
              <div key={playlist.id}>
                <h3>{playlist.name}</h3>
                <iframe
                  title={playlist.name}
                  src={`https://open.spotify.com/embed/playlist/${playlist.id}`}
                  width="300"
                  height="380"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                ></iframe>
              </div>
            ))}
          </ul>
          <input
            type="text"
            className='tw-text-pink-500 tw-border-2 tw-border-purple-500 tw-rounded-full tw-text-center tw-font-bold tw-outline-none' 
            style={{width:'100%'}}
            placeholder="New Playlist Name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button className='tw-animate-rainbow' onClick={createPlaylist}>Create Playlist</button>
        </div>
      )}
    </div>
  );
};

export default Playlist;
