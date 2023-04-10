import React from 'react'
import beachResort from "../assets/beachResort.mp4"
import "../styles/main.css"
const Video = () => {
  return (
    <div className='main'>
        < video src={beachResort} autoPlay loop muted />
        <div className='home-text'>
             <h1>Captivating Paradise</h1>
             <h4>for unwinding and reveling</h4>
        </div>
    </div>
  )
}

export default Video