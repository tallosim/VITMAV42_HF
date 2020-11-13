const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(express.static('static'))

require('./route/index')(app)

app.use((err, req, res, next) => {
    res.end('Error')
    console.log(err)
})

app.listen(5000, () => console.log('http://localhost:5000'))

// const UserModel = require('./models/user')
// const fs = require('fs')

// const locs = JSON.parse(fs.readFileSync(__dirname + '/testLocations.json'))

// let valaki = new UserModel()
// valaki.name = 'Józsi2'
// valaki.email = 'jozsi2@jozsi.hu'
// valaki.password = '1234'

// valaki.save((err) => {
//     console.log(err)

//     const LocationModel = require('./models/location')

//     locs.forEach(element => {

//         let valami = new LocationModel()
//         valami.url = element.download_url
//         valami.captureDate = new Date()
//         valami.desc = 'Made by: ' + element.author
//         valami.lat = getRandomInRange(47.4, 47.6, 6)
//         valami.lon = getRandomInRange(18.939, 19.233, 6)
//         valami.locationName = 'Budapest'
//         valami._author = valaki

//         valami.save((err) => {
//             console.log(err)
//         })
//     })

// })


// function getRandomInRange(from, to, fixed) {
//     return (Math.random() * (to - from) + from).toFixed(fixed) * 1
// }