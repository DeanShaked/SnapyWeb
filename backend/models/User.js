const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        default:''
    },
    email:{
        type: String,
        default:''
    },
    password:{
        type: String,
        default:''
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

UserSchema.methods.validPassword = (password,hash) => {
    return bcrypt.compareSync(password,hash);
}

module.exports = mongoose.model('Users', UserSchema)