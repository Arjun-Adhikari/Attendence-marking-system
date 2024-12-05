
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    rollno: {
        type: Number,
        required: true,
    },
    attendence: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);
