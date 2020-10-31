/**
 * Send datas from the res.locals by the given dataType.
 */

const fs = require('fs')

module.exports = (objectRepository, dataType) => {
    return (req, res, next) => {
        if (dataType === 'locations') {
            const locations = JSON.parse(fs.readFileSync(__dirname + '/../testLocations.json'))
            res.json(locations)
        }
    }
}