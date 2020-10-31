const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('static'))

require('./route/index')(app)

app.listen(5000, () => console.log('http://localhost:5000'))