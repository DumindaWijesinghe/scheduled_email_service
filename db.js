const mongoose = require('mongoose');
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

mongoose.connect(`mongodb://${username}:${password}@${host}`, err => {
    if (!err) {
        console.log(`successfully connected to db at ${host}`);
    }
});