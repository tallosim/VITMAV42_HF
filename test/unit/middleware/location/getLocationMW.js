var expect = require('chai').expect
var getLocationMW = require('../../../../middleware/location/getLocationMW')

describe('getLocationMW middleware', () => {
    it('should set res.locals.location with location object from db', (done) => {
        const mw = getLocationMW({
            LocationModel: {
                findOne: (p1) => {
                    expect(p1).to.be.eql({ _id: 13 })
                    return {
                        populate: (p2, p3) => {
                            return {
                                exec: (cb) => {
                                    cb(null, { _author: { _id: 34 } })
                                }
                            }
                        }
                    }
                }
            }
        })

        const resMock = {
            locals: {}
        }
        mw({
            params: { locationID: 13 },
            session: { _id: 34 }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined)
                expect(resMock.locals).to.be.eql({ location: { _author: { _id: 34 } } })
                done()
            })
    })
    it('should call next with error when there is a db problem', (done) => {
        const mw = getLocationMW({
            LocationModel: {
                findOne: (p1) => {
                    expect(p1).to.be.eql({ _id: 13 })
                    return {
                        populate: (p1, p2) => {
                            return {
                                exec: (cb) => {
                                    cb('dbhiba', null)
                                }
                            }
                        }
                    }
                }
            }
        })

        const resMock = {
            locals: {}
        }
        mw({
            params: { locationID: 13 },
            session: { _id: 34 }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql('dbhiba')
                done()
            })
    })
    it('should call next when no location found in the db', (done) => {
        const mw = getLocationMW({
            LocationModel: {
                findOne: (p1) => {
                    expect(p1).to.be.eql({ _id: 13 })
                    return {
                        populate: (p1, p2) => {
                            return {
                                exec: (cb) => {
                                    cb(undefined, null)
                                }
                            }
                        }
                    }
                }
            }
        })

        const resMock = {
            locals: {}
        }
        mw({
            params: { locationID: 13 },
            session: { _id: 34 }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined)
                expect(resMock.locals).to.be.eql({})
                done()
            })
    })
    it('should call res.redirect with /logout when location._author._id not equal to req.session._id', (done) => {
        const mw = getLocationMW({
            LocationModel: {
                findOne: (p1) => {
                    expect(p1).to.be.eql({ _id: 13 })
                    return {
                        populate: (p1, p2) => {
                            return {
                                exec: (cb) => {
                                    cb(null, { _author: { _id: 34 } })
                                }
                            }
                        }
                    }
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
            params: { locationID: 13 },
            session: { _id: 0 }
        },
            resMock,
            () => {})
    })
})