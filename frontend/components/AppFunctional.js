import React from 'react'
import { useState } from 'react'

// Suggested initial states
const themessage = [ "You can't go left", "You can't go up" , "You can't go down",  "You can't go right", ""]
const dontmoveright = [2, 5, 8]
const dontmoveleft = [0, 3, 6]
const up = 2
const down = 6
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {

  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)
  const [click, setClick] = useState(4)

  const clickable = (e) => {
    if (e.target.id === "right" && dontmoveright.includes(index)){
      setClick(3)
   
    }
    else if (e.target.id === "up" && index <= up){
      setClick(1)
      
    }
    else if (e.target.id === "left" && dontmoveleft.includes(index)) {
      setClick(0)
      
    }
    else if (e.target.id === "down" && index >= down ) {
      setClick(2)
     
    }
    else {
      setClick(4)
   
    }
    return click
  }




  const changestepsleft = (e) => {
    e.preventDefault()
    console.log(e.target.id)
    // setClicks(clicks +1)
    // setSteps(steps+1)
    dontmoveleft.includes(index) ? setSteps(steps) : setSteps(steps + 1)
    dontmoveleft.includes(index) ? setIndex(index) : setIndex(index - 1);
    clickable(e)
    

  }

  const reset = (e) => {
    e.preventDefault();
    setSteps(initialSteps);
    setIndex(initialIndex)
    setClick(4)
  }

  const changestepsright = (e) => {
    e.preventDefault()
    dontmoveright.includes(index) ? setSteps(steps) : setSteps(steps + 1)
    dontmoveright.includes(index) ? setIndex(index) : setIndex(index + 1)
    clickable(e)

  }

  const changestepsup = (e) => {
    e.preventDefault()
    index <= up ? setSteps(steps) : setSteps(steps + 1)
    index <= up ? setIndex(index) : setIndex(index - 3)
    clickable(e)
  }


  const changestepsdown = (e) => {
    e.preventDefault()
    index >= down ? setSteps(steps) : setSteps(steps + 1)
    index >= down ? setIndex(index) : setIndex(index + 3)
    clickable(e)

  }




  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  // function reset() {
  //   // Use this helper to reset all states to their initial values.
  // }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }
console.log(index)
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {/* {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        } */}
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{themessage[click]}</h3>
      </div>
      <div id="keypad">
        <button onClick={changestepsleft} id="left">LEFT</button>
        <button onClick={changestepsup} id="up">UP</button>
        <button onClick={changestepsright} id="right">RIGHT</button>
        <button onClick={changestepsdown} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form >
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
