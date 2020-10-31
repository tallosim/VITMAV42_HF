/**
 * Renders template with the template engine.
 */

module.exports = (objectRepository, viewName, options) => {
    return (req, res, next) => {
        res.render(viewName, { ...options, ...res.locals })
    }
}