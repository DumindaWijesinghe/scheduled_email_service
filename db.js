const mongoose = require('mongoose');
mongoose.connect('mongodb://diff_user:diff2019@ds157654.mlab.com:57654/diff_email_service', err => {
    if (!err) {
        console.log('successfully connected to db at diff2019@ds157654.mlab.com:57654/diff_email_service');
    }
});