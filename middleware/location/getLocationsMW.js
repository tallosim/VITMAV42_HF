/**
 * Loads multiple locations from the DB.
 */

const requireOption = require('../requireOption')

module.exports = (objectRepository) => {

    const LocationModel = requireOption(objectRepository, 'LocationModel')

    return (req, res, next) => {
        LocationModel.find({}).populate('_author', 'name').exec((err, locations) => {
            if (err || !locations) {
                return next(err)
            }

            res.locals.locations = locations

            next()
        })
    }
}