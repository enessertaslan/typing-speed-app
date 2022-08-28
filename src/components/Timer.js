import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import Countdown from 'react-countdown';

function Timer() {
  let seconds=60
  const startTimer=useSelector(state=>state.words.startTimer);
  const time=useSelector(state=>state.words.time);
  const [timer,setTimer]=useState(seconds)
  if(startTimer )
  {
    setInterval(() => {
      setTimer((prevTimer) => timer-1)
  }, 1000);
  }
  
  return (
    <div>
      {timer}
    </div>
  )
}
export default Timer