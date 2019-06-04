import React from 'react'
import { Line } from 'react-chartjs-2'
import '../App.css'

const LineChart = ({
  baseCurrency,
  targetCurrency,
  chartData,
  bestTime,
  bestMoney,
  amount
}) => {
  return (
    <div className="chart">
      {/* <h1>{`From ${baseCurrency} to ${targetCurrency}`}</h1> */}
      <h3>{`Best time to exchange is on ${bestTime} and you would get ${(
        amount * bestMoney
      ).toFixed(2)} ${targetCurrency}`}</h3>
      <Line data={chartData} />
    </div>
  )
}

export default LineChart
