const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const db = require('./db');

const UserController = require('./user/UserController');

app.use('/users', UserController);

module.exports = app;