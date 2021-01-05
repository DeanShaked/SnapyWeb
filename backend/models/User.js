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
    username:{
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
    date:{
        type: Date,
        default: Date.now()
    }
})

UserSchema.methods.genrateHash = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

UserSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('Users', UserSchema)