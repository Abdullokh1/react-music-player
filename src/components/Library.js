import React from 'react'
import LibrarySong from './LibrarySong'
import './Library.scss'

export default function Library({song, currentSong, setCurrentSong, isClicked, isPlaying, setSong, audioref}) {
  return (
    <>
     <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className={`library-songs ${isClicked ? 'active-library' : ''}`}>
     <h2>Playlist</h2>
       {song.map(item =>{
        return <LibrarySong
        key={item.id} 
        setCurrentSong={setCurrentSong} 
        currentSong={item}
        song={song}
        id={item.id}
        audioref={audioref}
        isPlaying={isPlaying}
        setSong={setSong}

        />
       })}

     </div>
    
    </>
  )
}
