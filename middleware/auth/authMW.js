/**
 * If the user authenticated call next MW, otherwise redirect to /login
 */

module.exports = (objectRepository) => {
    return (req, res, next) => {
        /**
         * if(!belepve?) return res.redirect('/login')
         */

        next()
    }
}