const express = require('express')
const app = express()
const port = 3000
let code = 1111;
app.get('/set-code', (req, res) => {
    code =  req.query.code;
    res.send('Current Max code: '+ code)
})
app.get('/get-code', (req, res) => {
    res.send(JSON.stringify({code}))
})

app.use(express.static('public'))

app.listen(port, '0.0.0.0')
