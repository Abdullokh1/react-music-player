import React from 'react'

export default function LibrarySong({currentSong, id, song, isPlaying, setSong, setCurrentSong, audioref}) {
  const selectHandler = () =>{
    const selectedSong = song.filter(item => item.id === id)
    setCurrentSong(selectedSong[0]);

    const newSongs = song.map(item =>{
      if(item.id === id){
        return {
          ...item,
          active: true
        }
      }
      else{
        return {
          ...item,
          active: false
        }
      }
    })
    setSong(newSongs)


    if(isPlaying){
      const playPromise = audioref.current.play()
      if(playPromise !== undefined){
        playPromise.then((_) => {
          audioref.current.play()
        })
      }
    }
    
  }
  return (
    <div onClick={selectHandler} className={`library-song ${currentSong.active ? 'active' : ''}`}>
      <img className=' mb' src={currentSong.cover} alt={currentSong.name}   />
      <div className='song-desc'>
        <h3 className='mb '>{currentSong.name}</h3>
        <h4 className='mb '>{currentSong.artist}</h4>
      </div>
    </div>
  )
}
