const { response } = require("express")
const express = require("express")
const router = express.Router()
const registerTemplateCopy = require('../models/RegisterModels')
const bcrypt = require('bcrypt')

router.post('/signup', async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.passowrd,saltPassword)

    const registerUser = new registerTemplateCopy({
         fullName:request.body.fullName,
         username:request.body.username,
         email:request.body.email,
         passowrd:securePassword,
    })
    registerUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})  

module.exports = router