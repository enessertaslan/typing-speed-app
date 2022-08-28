import React, { useState } from 'react'
import './styles.css'
import { FaHistory } from "react-icons/fa";
import Countdown from 'react-countdown';
import Timer from './Timer';
import { startGame,resetGame,GameScore } from '../redux/wordSlice';
import { useDispatch,useSelector } from 'react-redux';
import { nanoid } from 'nanoid'



function SpeedType() {
  const SECONDS=useSelector(state=>state.words.time)
  const dispatch=useDispatch();
  const correctWords=useSelector(state=>state.words.correctWords);
  const inCorrectWords=useSelector(state=>state.words.inCorrectWords);
  const [inputValue,setInputValue]=useState('');
  const [inputValueIndex,setInputValueIndex]=useState(0);
  const [correct,setCorrect]=useState()
  let [inputCounter,setInputCounter]=useState(0);
  const [countDown,setCountDown]=useState(SECONDS);
  let [wordInput,setWordInput]=useState(0)
  const wordList=useSelector(state=>state.words.wordList);
  const [resultDisplay,setResultDisplay]=useState('app-score-div-none')
  function Start(){
    if(inputCounter===0)
    {
      dispatch(startGame())
      setResultDisplay('app-score-div-none')
      setInputCounter(1)
      let interval = setInterval(() => {
        setCountDown((prevCountDown) =>{
          if(prevCountDown === 0)
          {
            setResultDisplay('app-score-div')
            dispatch(resetGame())
            clearInterval(interval)
            setCountDown(SECONDS)
            setInputCounter(0);
            setInputValueIndex(0);
            setInputValue('')
          }else{
            return prevCountDown-1
          }
        } )
      }, 1000);
    }
  }
function Reset(){
  dispatch(resetGame())
  setCountDown(0);
  setInputValueIndex(0);
  setInputValue('');
}
  const handleChange=(e)=>{
    setWordInput(wordInput+=1)
    console.log(wordInput)
    if(e.keyCode===8)
    {
      setWordInput(wordInput--);
    }
    if(e.keyCode===32)
    {
      setWordInput(wordInput-=1);
      setInputValueIndex(inputValueIndex+1)
      const wordToCompare=wordList[inputValueIndex];
      
      const isMatched=wordToCompare===inputValue.trim();
      console.log(isMatched);
      setInputValue("")
      if(isMatched)
      {
        dispatch(GameScore({matched:true,id:inputValueIndex,text:e.target.value}))
        setCorrect(true)
      }else{
        dispatch(GameScore(false))
        setCorrect(false)
      }
    }
  }
  return (
    <div className="app-container">
      <div className="app-text-area">
        {wordList.map((e,index)=>{
          if(index===inputValueIndex)
          {
            return <b key={index} className={"app-word"}>{e}</b>
          }else if(inputValueIndex===0)
          {
            return <span key={index} className={"app-word"}>{e}</span>
          }else if(index===inputValueIndex-1 && correct===true){
           return  <span key={index} className={"app-word-correct"}>{e} </span>
          }else if(index===inputValueIndex-1 && correct===false){
            return  <span key={index} className={"app-word-incorrect"}>{e} </span>
          }else if(index>inputValueIndex){
            return  <span key={index} className={"app-word"}>{e} </span>
          }
          
})
        }
      </div>
      <div className="app-input-area">
        <input type="text" value={inputValue} onKeyDown={handleChange} onChange={(e)=>{setInputValue(e.target.value);Start()}} />
        <div className="app-countdown">
          {countDown}
        </div>
        <div className="app-reset-button">
          <button type='button' className='btn btn-primary btn-md' onClick={Reset}>
            <FaHistory/>
          </button>
        </div>
       
      </div>
      <div className={resultDisplay}>
        <div className="score-title">
        Sonuç
        </div>
        <div className="score-result">
        <p>Score: {correctWords} </p>
        <p>Correct Words: {correctWords}</p>
        <p>Incorrect Words: {inCorrectWords}</p>
        <p>Accuary: %{((correctWords / (correctWords + inCorrectWords) || 0) * 100).toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default SpeedType