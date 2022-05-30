
import { useRef, useState } from 'react';
import './App.scss';
import Library from './components/Library';
import Navbar from './components/Navbar/Navbar';
import Player from './components/Player';
import Song from './components/Song';
import data from './Data'

function App() {
  const audioref = useRef(null)

  const [song, setSong] = useState(data())
  const [isPlaying, setPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(song[0])
  const [isClicked, setClicked] = useState(false)
  const [songInfo, setSongInfo] = useState({
    current: 0,
    duration: 0,
    animatePercentage: 0,
  })

  const timeUpdateHandler = (e) =>{
    let current = e.target.currentTime;
    let duration = e.target.duration;

    const roundCurrent = Math.round(current);
    const roundDuration = Math.round(duration);
    const animate = Math.round((roundCurrent / roundDuration)*100);

    setSongInfo({...songInfo, current, duration, animatePercentage: animate})
    
  }


  return (
    <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`, transition: 'all 1s ease'}} className='App'>
      <div className={`container ${isClicked ? 'active-container' : ''}`}>
        <Navbar
        isClicked={isClicked}
        setClicked={setClicked}
        />
        <Song currentSong={currentSong} isPlaying={isPlaying}  setCurrentSong={setCurrentSong}/>
        <Player 
        audioref={audioref} 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        setPlaying={setPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        song={song}
        setSong={setSong}
        setCurrentSong={setCurrentSong}
        timeUpdateHandler={timeUpdateHandler}
        />

      </div>
      <Library song={song}
      isPlaying={isPlaying} 
      audioref={audioref} 
      setCurrentSong={setCurrentSong}
      setSong={setSong}
      isClicked={isClicked}
      currentSong={currentSong}
      />
    </div>
  );
}

export default App;
