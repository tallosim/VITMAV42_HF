/**
 * Renders template with the template engine.
 */
const requireOption = require('./requireOption')

module.exports = (objectRepository, viewName, options) => {
    return (req, res, next) => {
        res.render(viewName, { ...options, ...res.locals })
    }
}