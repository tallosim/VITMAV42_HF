/**
 * Loads a location from the DB.
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {

    const LocationModel = requireOption(objectRepository, 'LocationModel')

    return (req, res, next) => {
        LocationModel.findOne({ _id: req.params.locationID }).populate('_author', 'name').exec((err, location) => {
            if (err || !location) {
                return next(err)
            }

            res.locals.location = location

            next()
        })
    }
}