import React, { useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies,setTenzies] = useState(false)

  useEffect(()=>{   //here we are using useEffect as two of states changes so track hold on them
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
  }
  },[dice])
   
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      })
    }
    return newDice
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  function rollDice() {
if(!tenzies){
    setDice(oldDice => oldDice.map(Die => {
      return (
        Die.isHeld ? Die : { ...Die, value: Math.floor(Math.random() * 6) }
      )
    }))
  }else{
    setTenzies(false)
    setDice(allNewDice())
  }
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    <main>
      {tenzies && <Confetti/>}
       <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={rollDice} className='roll-dice'>
        {tenzies ?   'Start Tenzies':'Roll Dices'}
      </button>
    </main>
  )
}
