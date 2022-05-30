import React, {  useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause, faRandom, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'

export default function Player({
  currentSong,
  isPlaying, 
  setPlaying,
  audioref,
  setSongInfo,
  songInfo,
  song,
  setCurrentSong,
  setSong,
  timeUpdateHandler,
  }) {


    useEffect(() =>{
      const newSongs = song.map(item =>{
        if(item.id === currentSong.id){
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
    }, [currentSong])

    if(isPlaying){
      const playPromise = audioref.current.play()
      if(playPromise !== undefined){
        playPromise.then((_) => {
          audioref.current.play()
        })
      }
    }
    
  
  const getTime = (time) => {

    if(time) {
        return (
          Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
      )
    }
    else{
      return '0:00'
    }
   
  }

  const playHandler = () =>{
    isPlaying ? audioref.current.pause() : audioref.current.play()
    setPlaying(!isPlaying)
  }

  const dragHandler = (e) =>{
    audioref.current.currentTime = e.target.value
    setSongInfo({...songInfo, current: e.target.value})
  }

  const skipTrackHandler = (track) =>{
    let currentIndex = song.findIndex((song) => song.id === currentSong.id)

    if(track === 'skip-forward'){
      setCurrentSong(song[(currentIndex + 1) % song.length])
    }
    if(track === 'skip-back'){
      if((currentIndex - 1) % song.length === -1){
        setCurrentSong(song[song.length - 1])
        return
      }
      setCurrentSong(song[(currentIndex - 1) % song.length])
    }
  }
  
  let trackAnim = {
    transform: `translateX(${songInfo.animatePercentage}%)`
  }

  const randomHandler = () =>{
    let randomItem = setSong[song[Math.floor(Math.random() * song.length)]]
   
    console.log(Math.random() * song.length);
  }

  

  return (
   <div className="player">
     <div className='btn-wrapper'>
       <Button onClick={randomHandler} className='random-btn' variant="contained">
         <FontAwesomeIcon icon={faRandom} size='2x'/>
        </Button>
        <Button className='random-btn' variant="contained">
         <FontAwesomeIcon icon={faRepeat} size='2x'/>
        </Button>
     </div>
     <div className='time-control'>
       <p>{getTime(songInfo.current)}</p>
       <div className='track-wrapper'>
          <div className='track'>
              <input 
              max={songInfo.duration || 0} 
              value={songInfo.current} 
              type="range"
              onChange={dragHandler}
              />
            <div style={trackAnim} className='animate-track'></div>
          </div>
       </div>

       <p>{getTime(songInfo.duration)}</p>
     </div>
     <div className='play-control'>
       <Button variant='contained' className='random-btn' onClick={() => skipTrackHandler('skip-back')}>
         <FontAwesomeIcon className='skip-back music-icons' size='3x' icon={faAngleLeft}/>
       </Button>
       <Button variant='contained' className='random-btn' onClick={playHandler}>
         <FontAwesomeIcon  className='play-icon music-icons' icon={isPlaying ? faPause : faPlay} size='3x' />
       </Button>
       <Button variant='contained' className="random-btn" onClick={() => skipTrackHandler('skip-forward')}>
         <FontAwesomeIcon className='skip-forward music-icons' size='3x' icon={faAngleRight}/>
       </Button>
     </div>

     <audio 
     onTimeUpdate={timeUpdateHandler} 
     ref={audioref}
     src={currentSong.audio}
     onLoadedMetadata={timeUpdateHandler}
    >

    </audio>

   </div>
  )
}
