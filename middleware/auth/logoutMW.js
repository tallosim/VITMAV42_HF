/**
 * Delete current session for user and redirect to /login
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {
    return (req, res, next) => {
        req.session.destroy(err => {
            res.redirect('/login')
        })
    }
}