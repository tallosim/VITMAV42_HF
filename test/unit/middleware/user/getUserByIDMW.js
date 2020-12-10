var expect = require('chai').expect
var getUserByIDMW = require('../../../../middleware/user/getUserByIDMW')

describe('getUserByIDMW middleware', () => {
    it('sould set res.locals.user with user object from db', (done) => {
        const mw = getUserByIDMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 13 })
                    cb(null, 'user')
                }
            }
        })

        const resMock = {
            locals: {}
        }
        mw({
            session: { _id: 13 }
        }, resMock, (err) => {
            expect(err).to.be.eql(undefined)
            expect(resMock.locals).to.be.eql({ user: 'user' })
            done()
        })
    })
    it('sould call next with error when there is a db problem ', (done) => {
        const mw = getUserByIDMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 13 })
                    cb('dbhiba', null)
                }
            }
        })

        const resMock = {
            locals: {}
        }
        mw({
            session: { _id: 13 }
        }, resMock, (err) => {
            expect(err).to.be.eql('dbhiba')
            done()
        })
    })
    it('sould call next when no user found in the db', (done) => {
        const mw = getUserByIDMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 13 })
                    cb(undefined, null)
                }
            }
        })

        const resMock = {
            locals: {}
        }
        mw({
            session: { _id: 13 }
        }, resMock, (err) => {
            expect(err).to.be.eql(undefined)
            expect(resMock.locals).to.be.eql({})
            done()
        })
    })
    it('should call res.redirect with /logout when req.session._id not exist', (done) => {
        const mw = getUserByIDMW({
            UserModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 13 })
                    cb(null, 'user')
                }
            }
        })

        const resMock = {
            locals: {},
            redirect: (p1) => {
                expect(p1).to.be.eql('/logout')
                done()
            }
        }
        mw({
            session: {}
        }, resMock, (err) => {})
    })
})