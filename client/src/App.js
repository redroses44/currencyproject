import React from 'react'
import './App.css'

function App() {
  return (
    <div className="formContainer">
      <h1>Currency Project</h1>
      <form className="form">
        <div className="input-group">
          <input type="text" placeholder="Enter Base Currency.." />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Enter Target Currency.." />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Enter Money Amount.." />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Enter Max Waiting Time.." />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App
