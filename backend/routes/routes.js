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
        username,
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
    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank.'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        })
    }
    
    email = email.toLowerCase();

    // 1. Verify email doesn't exist
    // 2. Save

    
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
        newUser.username = username
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
    const {
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
    }, (error, users) => {
        if (error) {
            return res.send({
                success: false,
                message: 'Server Error'
            })
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Invalid user'
            })
        }

        const user = users[0]

        if (!user.validPassword(passwrod)){
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
            })
        })

    })
})

module.exports = router