/**
 * Check the given password, if it is ok create a new session and redirect to /.
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (!req.body.password) {
            return next()
        }
        
        if (req.body.password === res.locals.user.password) {
            return res.redirect('/')
        }

        res.locals.error = 'Wrong password!'
        next()
    }
}