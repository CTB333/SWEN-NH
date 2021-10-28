const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.plugin(uniqueValidator);

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email });
    if (user) {
        let check = bcrypt.compare(password, user.password)
        if (check) {
            return user;
        }
        throw new Error('Password is invalid')
    }
    throw new Error('User not found');
}

const User = mongoose.model('users', userSchema);

module.exports = User;