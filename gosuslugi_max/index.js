const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use(express.static('public'))

app.listen(port, '81.200.155.19', () => {
    console.log(`Example app listening on port ${port}`)
})
