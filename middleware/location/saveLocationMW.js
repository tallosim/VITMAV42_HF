/**
 * Save or update a location to the DB.
 * If res.locals.location exist, it's an update otherwise this MW create a new location.
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {

    const LocationModel = requireOption(objectRepository, 'LocationModel')

    return (req, res, next) => {
        if (!res.locals.location) {
            res.locals.location = new LocationModel()
            res.locals.location._author = req.session._id
        }

        if (req.query.lat && req.query.lon) {
            res.locals.location.lat = req.query.lat
            res.locals.location.lon = req.query.lon
        }

        var count = 0
        const fieldNames = ['name', 'captureDate', 'desc', 'url', 'lat', 'lon']
        fieldNames.map(fieldName => {
            if (req.body[fieldName]) {
                res.locals.location[fieldName] = req.body[fieldName]
                count++
            }
        })

        if (count < fieldNames.length) {
            if (count > 0) res.locals.error = 'Fill all the fields!'
            return next()
        }

        res.locals.location.name = req.body.name
        res.locals.location.captureDate = req.body.captureDate
        res.locals.location.desc = req.body.desc
        res.locals.location.url = req.body.url
        res.locals.location.lat = req.body.lat
        res.locals.location.lon = req.body.lon

        if (res.locals.location._author._id != req.session._id) {
            return res.redirect('/logout')
        }

        res.locals.location.save(err => {
            if (err) {
                return next(err)
            }

            return res.redirect('/')
        })
    }
}