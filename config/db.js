const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/eqge5j', {useUnifiedTopology: true, useNewUrlParser: true})

module.exports = mongoose