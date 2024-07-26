// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 16,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[\w!@#\$%\^&\*]{10,16}$/
    },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

module.exports = mongoose.model('User', userSchema);
