const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);