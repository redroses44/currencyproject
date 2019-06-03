import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import LineChart from './components/LineChart'

const App = () => {
  useEffect(() => {
    const getAllCurrencies = async () => {
      const response = await axios.get('https://api.exchangeratesapi.io/latest')
      setCurrencies(Object.keys(response.data.rates))
    }
    getAllCurrencies()
  }, [])

  const [chartData, setChartData] = useState({})

  const [formData, setFormData] = useState({
    baseCurrency: 'AUD',
    targetCurrency: 'AUD',
    amount: '',
    maxWaitingTime: ''
  })

  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true)

  const { baseCurrency, targetCurrency, amount, maxWaitingTime } = formData

  const onChange = e => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    const curObj = {
      baseCurrency,
      targetCurrency,
      maxWaitingTime
    }
    try {
      const response = await axios.post('/currency', curObj)
      const labels = Object.values(response.data.rates)
      setChartData({
        labels: Object.keys(response.data.rates),
        datasets: [
          {
            label: 'Currency value',
            data: labels.map(label => Object.values(label)),
            backgroundColor: [
              'rgba(255, 255, 255, 1)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      })
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="grid">
      <div className="formContainer">
        <h1>Currency Project</h1>
        <form onSubmit={onSubmit} className="form">
          <div className="input-group">
            <input
              onChange={onChange}
              value={amount}
              name="amount"
              type="number"
              placeholder="Money Amount.."
            />
            <select
              name="baseCurrency"
              onChange={onChange}
              value={baseCurrency}
            >
              {currencies.sort().map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <input
              name="maxWaitingTime"
              onChange={onChange}
              value={maxWaitingTime}
              type="text"
              placeholder="Max Waiting Weeks"
            />
            <select
              name="targetCurrency"
              onChange={onChange}
              value={targetCurrency}
            >
              {currencies.sort().map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      {!loading && (
        <LineChart
          loading={loading}
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrency}
          options={{}}
          chartData={chartData}
        />
      )}
    </div>
  )
}

export default App
