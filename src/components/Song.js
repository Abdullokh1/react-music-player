import React from 'react'

export default function Song({currentSong, isPlaying}) {
  return (
    <div className="song-container">
      <img className={`main-img mb ${isPlaying ? 'song-img' : ''}`} src={currentSong.cover} alt={currentSong.name} width='180' height='180'  />
      <h1 className='mb song-names'>{currentSong.name}</h1>
      <h1 className='mb song-names'>{currentSong.artist}</h1>
    </div>
    
  )
}





