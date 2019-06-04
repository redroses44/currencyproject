import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import LineChart from './components/LineChart'
import Spinner from './components/Spinner'

const App = () => {
  const [chartData, setChartData] = useState({})
  const [bestTime, setBestTime] = useState(null)
  const [bestMoney, setBestMoney] = useState(null)
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    baseCurrency: 'EUR',
    targetCurrency: 'USD',
    amount: '',
    maxWaitingTime: ''
  })
  const { baseCurrency, targetCurrency, amount, maxWaitingTime } = formData

  useEffect(() => {
    const getAllCurrencies = async () => {
      const response = await axios.get('https://api.exchangeratesapi.io/latest')
      setCurrencies(Object.keys(response.data.rates))
    }
    getAllCurrencies()
  }, [])

  useEffect(() => {
    const getChart = async () => {
      setLoading(false)
      const curObj = {
        baseCurrency,
        targetCurrency,
        maxWaitingTime
      }
      try {
        const response = await axios.post('/currency', curObj)
        const values = []
        const labels = Object.values(response.data.ordered)
        labels.map(label => values.push(label[targetCurrency]))
        setBestMoney(Math.max.apply(null, values))

        //const avg = values.reduce((acc, cur) => acc + cur) / values.length

        setChartData({
          labels: Object.keys(response.data.ordered),
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
        setLoading(true)
      } catch (error) {
        console.log(error.message)
      }
    }
    getChart()
  }, [targetCurrency, baseCurrency, maxWaitingTime])

  const onChange = async e => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="grid">
      <div className="formContainer">
        <h1>Currency Project</h1>
        <form className="form">
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
              <option>EUR</option>
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
              <option>EUR</option>
              {currencies.sort().map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      {loading ? (
        <LineChart
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrency}
          options={{}}
          chartData={chartData}
          bestMoney={bestMoney}
          bestTime={bestTime}
          amount={amount}
        />
      ) : maxWaitingTime ? (
        <Spinner />
      ) : (
        <div className="flex">
          <h1 className="warning">Max Waiting Time Cannot Be Empty</h1>
        </div>
      )}
    </div>
  )
}

export default App
