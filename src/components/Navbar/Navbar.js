import { faMagic, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navbar.scss'
import React from 'react'
import { Button } from '@mui/material'
import '../../style/_player.scss'


export default function Navbar({isClicked, setClicked}) {
 
  return (
     <nav className='nav'>
       <h1 className='nav-title'>Chill out Music</h1>
       <Button variant='contained'  onClick={() => setClicked(!isClicked)} className='nav-btn random-btn'>
         Playlist
         <FontAwesomeIcon className='nav-icon' icon={faMusic}/>
        </Button>
     </nav>
  )
}
