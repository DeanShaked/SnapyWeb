const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const UserSession = require('../models/UserSession')


router.post('/register', (req, res) => {

    const { body } = req
    var {
        fullName,
        email,
        password
    } = body

    if (!fullName) {
        return res.send({
            success: false,
            message: 'Error: FullName cannot be blank.'
        })
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        })
    }
    
    email = email.toLowerCase();

    User.find({
        email:email
    }, (err, previousUsers) => {
        if (err) {
            return res.send('Error: Server error')
        }
        else if (previousUsers.length > 0) {
            return res.send('Error: User already exists.')
        }

        const newUser = new User()
        newUser.fullName = fullName
        newUser.email = email
        newUser.password = newUser.generateHash(password)
    
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                })
            }
            return res.send({ 
                success: true,
                message: 'Registered'
            })
        })
    }
    )
    
})

router.post('/login', (req, res) => {
    const { body } = req
    var {
        email,
        password
    } = body

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        })
    }

    email = email.toLowerCase();

    User.find({
        email:email
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server Error'
            })
        }

        // incase we get 0 users
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Invalid user'
            })
        }

        const user = users[0]
        
        if (!user.validPassword(password,user.password)){
            return res.send({
                success: false,
                message: 'Invalid password'
            })
        }

        const userSession = new UserSession
        userSession.userId = user._id
        userSession.save((error, doc) => {
            if (error) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                })
            }
            
            return res.send({
                success: true,
                message: 'Valid Sign In',
                token: doc._id
            },
            )
        })

    })
})

router.post('/verify', (req, res) => {
    const { query } = req;
    const { token } = query;
    
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, session) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error"
            })
        }
        if (session.length != 1) {
            return res.send({ 
                success: false,
                message: "Invalid Token"
            })
        }
        else {
            return res.send({
                success: true,
                message: "Good"
            })
        }

    })
})

router.post('/logout', (req, res) => {
    const { query } = req;
    const { token } = query;
    
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set:{isDeleted:true}
    },
    null,
    (err, session) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error: Server error"
            })
        }

        else {
            return res.send({
                success: true,
                message: "Good"
            })
        }

    })
})

module.exports = router