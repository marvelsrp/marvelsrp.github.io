const express = require('express')
const app = express()
const port = 3000

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.use(express.static('public'))

app.listen(port, '0.0.0.0')
