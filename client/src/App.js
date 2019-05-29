import Axios from 'axios'
import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [data, setData] = useState({
    baseCurrency: '',
    targetCurrency: '',
    amount: '',
    maxWaitingTime: ''
  })
  const { baseCurrency, targetCurrency, amount, maxWaitingTime } = data
  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    const curObj = {
      baseCurrency,
      targetCurrency,
      maxWaitingTime
    }
    try {
      const response = await Axios.post('/currency', curObj)
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="formContainer">
      <h1>Currency Project</h1>
      <form onSubmit={onSubmit} className="form">
        <div className="input-group">
          <input
            onChange={onChange}
            value={baseCurrency}
            name="baseCurrency"
            type="text"
            placeholder="Enter Base Currency.."
          />
        </div>
        <div className="input-group">
          <input
            onChange={onChange}
            value={targetCurrency}
            name="targetCurrency"
            type="text"
            placeholder="Enter Target Currency.."
          />
        </div>
        <div className="input-group">
          <input
            onChange={onChange}
            value={amount}
            name="amount"
            type="text"
            placeholder="Enter Money Amount.."
          />
        </div>
        <div className="input-group">
          <input
            name="maxWaitingTime"
            onChange={onChange}
            value={maxWaitingTime}
            type="text"
            placeholder="Enter Max Waiting Time.."
          />
        </div>
        <div className="input-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default App
