import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const URL = 'http://localhost:9000/api/result'

const themessage = ["You can't go left", "You can't go up", "You can't go down", "You can't go right", ""]
const coordinates = ["(1,1)", "(2,1)", "(3,1)",
  "(1,2)", "(2,2)", "(3,2)",
  "(1,3)", "(2,3)", "(3,3)"]
const dontmoveright = [2, 5, 8]
const dontmoveleft = [0, 3, 6]
const up = 2
const down = 6


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

// const initialState = {
//   email: initialEmail,
//   index: initialIndex,
//   steps: initialSteps,

// }

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      click: 4,
      finalemail: "",
      displayon: false
      
    }

  }

  changingtheBLeft = (e) => {
    dontmoveleft.includes(this.state.index) ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 1 });
    if (e.target.id === "left" && dontmoveleft.includes(this.state.index)) {
      this.setState({ ...this.state, click: 0 })
    }
    else{
      this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 1 , click: 4})
    }
  }

  changingtheBright = (e) => {
    dontmoveright.includes(this.state.index) ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index + 1 })
    if (e.target.id === "right" && dontmoveright.includes(this.state.index)) {
      this.setState({ ...this.state, click: 3 })
    }
    else{
      this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index + 1 , click: 4})
    }
  }

  changingtheBup = (e) => {
    this.state.index <= up ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 3 })
    if (e.target.id === "up" && this.state.index <= up) {
      this.setState({ ...this.state, click: 1 })
    }
    else{
      this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 3 , click: 4})
    }
  }

   changingtheBdown = (e) => {
    this.state.index >= down ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index + 3 })
    if (e.target.id === "down" && this.state.index >= down) {
      this.setState({ ...this.state, click: 2 })
    }
    else{
      this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index + 3 , click: 4})
    }
  }


    reset = (e) => {
      this.setState({ ...this.state, steps: initialSteps, index: initialIndex, click : 4 , displayon: false, email: initialEmail})
    }

   
// ~~~~~~~~~~~~~all of this is the form now ~~~~~~~~~

onsubmithandler = (e) => {
  e.preventDefault()
 const addstuff = { x: coordinates[this.state.index][1], y: coordinates[this.state.index][3], steps: this.state.steps, email: this.state.email  };

  axios.post("http://localhost:9000/api/result",  addstuff)
  .then(resp => {
  const display = resp.data.message
this.setState({...this.state, finalemail: display, displayon: true})}
  )
  .catch(err => { console.log(err.response.data.message) 
    this.setState({...this.state, finalemail: err.response.data.message, displayon: true})})
}

onchangehandler = (e) => {
  e.preventDefault()
  this.setState({...this.state, email: e.target.value})

}
  
    render() {
      const { className } = this.props
      return (
        <div id="wrapper" className={className}>
          <div className="info">
            <h3 id="coordinates">Coordinates {coordinates[this.state.index]}</h3>
            <h3 id="steps">You moved {this.state.steps} times</h3>
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
                <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                  {idx === this.state.index ? 'B' : null}
                </div>
              ))
            }
          </div>
          <div className="info">
            <h3 id="message"> { this.state.displayon ?   this.state.finalemail : themessage[this.state.click] }</h3>
          </div>
          <div id="keypad">
            <button onClick={this.changingtheBLeft} id="left">LEFT</button>
            <button onClick={this.changingtheBup} id="up">UP</button>
            <button onClick={this.changingtheBright} id="right">RIGHT</button>
            <button onClick={this.changingtheBdown} id="down">DOWN</button>
            <button onClick={this.reset} id="reset">reset</button>
          </div>
          <form onSubmit={this.onsubmithandler}>
            <input onChange={this.onchangehandler}id="email" type="email" placeholder="type email"></input>
            <input id="submit" type="submit"></input>
          </form>
        </div>
    )
  }
}





    // // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
    // // You can delete them and build your own logic from scratch.

    // getXY = () => {
    //   // It it not necessary to have a state to track the coordinates.
    //   // It's enough to know what index the "B" is at, to be able to calculate them.
    // }

    // getXYMessage = () => {
    //   // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    //   // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    //   // returns the fully constructed string.
    // }

    // // reset = () => {
    // //   // Use this helper to reset all states to their initial values.
    // // }

    // getNextIndex = (direction) => {
    //   // This helper takes a direction ("left", "up", etc) and calculates what the next index
    //   // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    //   // this helper should return the current index unchanged.
    // }

    // move = (evt) => {

    //   // this.useState({...this.state, index : initialIndex  })
    //   // This event handler can use the helper above to obtain a new index for the "B",
    //   // and change any states accordingly.
    // }

    // onChange = (evt) => {
    //   // You will need this to update the value of the input.
    // }

    // onSubmit = (evt) => {
    //   // axios.post(URL, {})
    //   // Use a POST request to send a payload to the server.
    // }
  