/**
 * Create a new user to the DB from the give props (from POST).
 */
const requireOption = require('../requireOption')

module.exports = (objectRepository) => {

    const UserModel = requireOption(objectRepository, 'UserModel')

    return (req, res, next) => {
        delete res.locals.error

        if (res.locals.user) {
            res.locals.error = 'This email already registered!'
            return next()
        }

        if (req.body.email && req.body.fullname && req.body.password && req.body.passwordagain) {
            if (req.body.password === req.body.passwordagain) {
                let user = UserModel()

                user.email = req.body.email
                user.name = req.body.fullname
                user.password = req.body.password

                user.save(err => {
                    if (err) {
                        return next(err)
                    }

                    return res.redirect('/login')
                })
            }
            else {
                res.locals.error = 'Passwords not equal!'
                return next()
            }
        }
        else return next()
    }
}