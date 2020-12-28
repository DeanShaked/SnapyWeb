const { response } = require("express")
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')


router.post('/register', (req, res, next) => {

    const { body } = req
    const {
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
    },(error,previousUsers) =>{
        if(error){
            return res.send('Error: Server error')
        }
        else if (previousUsers.length > 0) {
            return res.send('Error: User already exists.')
        }
        const newUser = new User()
        newUser.fullName = fullName
        newUser.email = email
        newUser.username = username
        newUser.password = newUser.generateHash(password,saltPassword)
        
        newUser.save((error, user) => {
            if (error) {
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

module.exports = router