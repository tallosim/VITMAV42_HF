/**
 * Removes the location from the DB.
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {

    const LocationModel = requireOption(objectRepository, 'LocationModel')

    return (req, res, next) => {
        if (res.locals.location._author._id != req.session._id) {
            return res.redirect('/logout')
        }

        LocationModel.deleteOne({ _id: res.locals.location._id }, err => {
            if (err) {
                next(err)
            }

            return res.redirect('/')
        })
    }
}