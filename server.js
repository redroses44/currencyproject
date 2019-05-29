const express = require('express')
const port = process.env.PORT || 8000
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/currency', require('./routes/currency'))

app.listen(port, () => console.log(`Server running on port ${port}`))
