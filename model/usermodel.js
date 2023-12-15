

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    google_ID: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true },
    img_url: { type: String},
},
{timestamps: true}
);

module.exports = mongoose.model('User', userSchema);

