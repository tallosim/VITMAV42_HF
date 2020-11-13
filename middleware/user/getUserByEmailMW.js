/**
 * Loads a user from the DB by the given Email.
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {

    const UserModel = requireOption(objectRepository, 'UserModel')

    return (req, res, next) => {
        if (!req.body.email) {
            return next()
        }


        UserModel.findOne({ email: req.body.email }, (err, user) => {
            if (err || !user) {
                return next(err)
            }

            res.locals.user = user
            next()
        })
    }
}