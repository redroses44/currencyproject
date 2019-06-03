import React from 'react'
import { Line } from 'react-chartjs-2'
import '../App.css'

const LineChart = ({ baseCurrency, targetCurrency, chartData, loading }) => {
  return !loading ? (
    <div className="chart">
      <h1>{`From ${baseCurrency} to ${targetCurrency}`}</h1>
      <Line data={chartData} />
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default LineChart
