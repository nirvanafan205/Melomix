import React, { useEffect, useState } from 'react'
import SpotifyPlayer  from 'react-spotify-web-playback'

export default function SongPlayer({accessToken, trackUri}) {
  const [play, setPlay] = useState(false)
  useEffect(() => {
    setPlay(true)
  },[trackUri])

  const uriTest = ['spotify:track:07UFnnK3uPIuKv5Rs9TmXl', 'spotify:track:3ZhTT6yjZwpPph5MIJ53XY', 'spotify:track:4YKAOXyqkKZ5gOZR0AmVMN']
  if(!accessToken){
    return null
  } 
 
  return (
    <SpotifyPlayer
      token = {accessToken}
      showSavedIcon
      callback ={state => {
          if(!state.isPlaying) setPlay(false)
      }}
      play= {play}
      uris = {trackUri? [trackUri] : []}
      styles={{
        bgColor: '#333',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        savedColor: '#fff',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  )
}