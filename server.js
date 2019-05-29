const express = require('express')
const port = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use('/currency', require('./routes/currency'))

app.listen(port, () => console.log(`Server running on port ${port}`))
