const router = require('express').Router()
const axios = require('axios')
const moment = require('moment')

router.get('/', async (req, res) => {
  const { baseCurrency, targetCurrency, maxWaitingTime } = req.body
  const endDate = moment(new Date()).format('YYYY-MM-DD')
  const startDate = moment()
    .subtract(maxWaitingTime, 'weeks')
    .format('YYYY-MM-DD')
  try {
    const response = await axios.get(
      `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${baseCurrency}&symbols=${targetCurrency}`
    )
    res.json(response.data)
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = router
