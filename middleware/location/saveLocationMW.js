/**
 * Save or update a location to the DB.
 * If res.locals.location exist, it's an update otherwise this MW create a new lovócation.
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {

    const LocationModel = requireOption(objectRepository, 'LocationModel')

    return (req, res, next) => {
        if (!req.body.name || !req.body.captureDate || !req.body.desc || !req.body.url) {
            return next()
        }

        if (!res.locals.location) {
            res.locals.location = new LocationModel()
        }

        res.locals.location.name = req.body.name
        res.locals.location.captureDate = req.body.captureDate
        res.locals.location.desc = req.body.desc
        res.locals.location.url = req.body.url

        console.log(res.locals)

        res.locals.location.save(err => {
            if (err) {
                return next(err)
            }

            return res.redirect('/')
        })
    }
}