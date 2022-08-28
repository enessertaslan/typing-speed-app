import { createSlice } from "@reduxjs/toolkit";
import wordstr from '../api/words-tr.json'
import wordsen from '../api/words-en.json'

const getWords=(arr,num)=>{
    console.log(arr)
    let shuffledWordList=arr.map(value=>({value,sort:Math.random()}))
    .sort((a,b)=>a.sort-b.sort)
    .map(({value})=>value)
    return shuffledWordList.map((word)=>(word))
}
export const wordSlice=createSlice({
    name:'words',
    initialState:{
        wordList:getWords(wordstr),
        startTimer:false,
        isOn:false,
        time:60,
        correctWords:0,
        inCorrectWords:0,
        isCorrect:true,
        inputValueIndex:0,
    },
    reducers:{
        startGame(state,action)
        {
            state.correctWords=0;
            state.inCorrectWords=0;
        },
        resetGame(state,action)
        {
            state.time=60;
            state.wordList=getWords(wordstr)
        },
        GameScore(state,action)
        {
            console.log(action.payload)
            const inputValue=state.inputValueIndex;
            if(action.payload.matched===true)
            {
                state.inputValueIndex++;
                state.correctWords++;
                const test=state.wordList.filter(word=>word===action.payload.text)
                console.log(state.wordList)
                
            }else{
                state.inCorrectWords++
            }
        }
    },
    extraReducers:{
        
    }
})
export default wordSlice.reducer;
export const {resetGame,GameScore,startGame}=wordSlice.actions;