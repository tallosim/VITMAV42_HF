/**
 * Send datas from the res.locals by the given dataType.
 */
const requireOption = require('./requireOption')
const fs = require('fs')

module.exports = (objectRepository, dataType) => {
    return (req, res, next) => {
        if (dataType === 'locations') {
            res.json(res.locals.locations)
        }
    }
}