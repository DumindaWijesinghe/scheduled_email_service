const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv').config()
const db = require('./db');

// Scheduled jobs
require('./ScheduledJobs/EmailSchedule')

const EmailController = require('./email/EmailController');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/v1/emails', EmailController);

module.exports = app;