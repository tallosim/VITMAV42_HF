/**
 * Check the given password, if it is ok create a new session and redirect to /.
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (!req.body.password || !res.locals.user) {
            return next()
        }

        if (req.body.password === res.locals.user.password) {
            req.session.logged = true
            req.session._id = res.locals.user._id
            return req.session.save(err => res.redirect('/'))
        }

        res.locals.error = 'Invalid email or password!'
        return next()
    }
}