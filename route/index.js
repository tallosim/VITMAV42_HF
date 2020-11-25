const authMW = require('../middleware/auth/authMW')
const checkUserPwdMW = require('../middleware/auth/checkUserPwdMW')
const sendPwdMW = require('../middleware/auth/sendPwdMW')
const logoutMW = require('../middleware/auth/logoutMW')

const createUserWN = require('../middleware/user/createUserWN')
const getUserByEmailMW = require('../middleware/user/getUserByEmailMW')
const getUserByIDMW = require('../middleware/user/getUserByIDMW')

const getLocationMW = require('../middleware/location/getLocationMW')
const getLocationsMW = require('../middleware/location/getLocationsMW')
const saveLocationMW = require('../middleware/location/saveLocationMW')
const delLocationMW = require('../middleware/location/delLocationMW')

const renderMW = require('../middleware/renderMW')
const restApiMW = require('../middleware/restApiMW')

const UserModel = require('../models/user')
const LocationModel = require('../models/location')

module.exports = (app) => {
    const objectRepository = {
        UserModel: UserModel,
        LocationModel: LocationModel
    }

    app.get('/location',
        authMW(objectRepository),
        getLocationsMW(objectRepository),
        restApiMW(objectRepository, 'locations')
    )

    app.use('/location/new',
        authMW(objectRepository),
        saveLocationMW(objectRepository),
        renderMW(objectRepository, 'edit-location', { viewMode: 'new' })
    )

    app.use('/location/edit/:locationID',
        authMW(objectRepository),
        getLocationMW(objectRepository),
        saveLocationMW(objectRepository),
        renderMW(objectRepository, 'edit-location', { viewMode: 'edit' })
    )

    app.get('/location/delete/:locationID',
        authMW(objectRepository),
        getLocationMW(objectRepository),
        delLocationMW(objectRepository)
    )

    app.use('/login',
        getUserByEmailMW(objectRepository),
        checkUserPwdMW(objectRepository),
        renderMW(objectRepository, 'login')
    )

    app.use('/register',
        getUserByEmailMW(objectRepository),
        createUserWN(objectRepository),
        renderMW(objectRepository, 'register')
    )

    app.use('/forgot',
        getUserByEmailMW(objectRepository),
        sendPwdMW(objectRepository),
        renderMW(objectRepository, 'forgot-password')
    )

    app.use('/logout',
        logoutMW(objectRepository)
    )

    app.get('/',
        authMW(objectRepository),
        getUserByIDMW(objectRepository),
        renderMW(objectRepository, 'map')
    )
}