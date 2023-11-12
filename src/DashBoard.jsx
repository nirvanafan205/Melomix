import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";

// Spotify API Initialization
const spotifyApi = new SpotifyWebApi({
  clientID: "5eb084a46a0a4ff9a4c885b1bdd130da",

  // Creating an instance of SpotifyWebApi for interacting with the Spotify API
  // The client ID is provided during initialization
});

const DashBoard = ({ code }) => {
  // Authentication
  const accessToken = useAuth(code);

  // State Management
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  /*
      useState hook manages state of 
        search query (search)
        search results (searchResults)
        currently playing track (playingTrack)
  */

  //  callback function used when a user selects a track from the search results
  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");

    /*
      Update playingTrack
        setPlayingTrack(track): Sets the playingTrack state to the selected track

      Clearing the Search Query:
        setSearch(""): Clears the search query (search state)
        done to reset the search input after a track has been selected
    */
  }

  // Effect for Setting Access Token
  // useEffect hook to set the access token in the SpotifyWebApi instance when the access token changes
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Effect for Searching Tracks
  // hook to search for tracks based on the current search query
  useEffect(() => {

    // If the search query is empty or there's no access token, clears the search results
    if (!search) return setSearchResults([]);

    // Checks if there is a valid accessToken. 
    // If not, the function returns early, preventing the Spotify API request from being made without a valid access token
    if (!accessToken) return;

    // Cancellation Mechanism
    // used to determine whether the search request should be canceled
    let cancel = false;

    // a search for tracks on Spotify using the spotifyApi.searchTracks method
    spotifyApi.searchTracks(search).then((res) => {
      // Cancellation Check
      // if the cancel flag is set to true. 
      // If it is, it returns early, effectively canceling the processing of the search result
      if (cancel) return;

      // Search Results Processing
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
            /*
                Maps over the tracks in the search result
                extracts relevant information such as
                   artist name, track title, URI, and the URL of the smallest album image
            */  
        })
      );
    });
    // Cleanup Function
    // Returns a cleanup function that sets the cancel flag to true when the component unmounts or when the search or accessToken changes
    // any ongoing or pending search request is canceled when the component is no longer in use
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <input
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {/*// this is where the album cover and background will be*/}
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>

      {/* put code here and after  */}
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
};

export default DashBoard;
