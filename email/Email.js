var mongoose = require('mongoose');
var EmailSchema = new mongoose.Schema({
    to: String,
    content: String,
    subject: String,
    status: String
}, {
    timestamps: true
});
mongoose.model('Email', EmailSchema);

module.exports = mongoose.model('Email');