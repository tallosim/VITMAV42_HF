/**
 * Resend password to the user and redirect to /login
 */

const requireOption = require('../requireOption')

module.exports = (objectRepository) => {
    return (req, res, next) => {

        delete res.locals.error

        if (res.locals.user) {
            console.log('Send e-mail to: ' + res.locals.user.email)
            
            return res.redirect('/login')
        }
        else if (req.body.email) {
            res.locals.error = 'Email address not found!'
        }

        next()
    }
}