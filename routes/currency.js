const router = require('express').Router()
const axios = require('axios')
const moment = require('moment')
const { check, validationResult } = require('express-validator/check')

router.get(
  '/',
  [
    check('baseCurrency', 'Base currency is required')
      .not()
      .isEmpty(),
    check('targetCurrency', 'Target currency is required')
      .not()
      .isEmpty(),
    check('maxWaitingTime', 'Max waiting time is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

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
      res.status(500).send(error.message)
    }
  }
)

module.exports = router
