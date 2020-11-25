/**
 * If the user authenticated call next MW, otherwise redirect to /login
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (req.session.logged === undefined || req.session.logged !== true) {
            return res.redirect('/login')
        }

        next()
    }
}