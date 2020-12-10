/**
 * Loads a user from the DB by the given ID.
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {
    
    const UserModel = requireOption(objectRepository, 'UserModel')
    
    return (req, res, next) => {
        if (!req.session._id) {
            return res.redirect('/logout')
        }


        UserModel.findOne({ _id: req.session._id }, (err, user) => {
            if (err || !user) {
                return next(err)
            }

            res.locals.user = user
            return next()
        })
    }
}