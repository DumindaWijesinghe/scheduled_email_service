const express = require('express');
const router = express.Router();
const EmailHelper = require('../helpers/EmailHelper')
const Email = require('./Email');

// CREATES A NEW EMAIL
router.post('/', function (req, res) {
    try {
        const WORKING_HOURS_START = parseInt(process.env.WORKING_HOURS_START);
        const WORKING_HOURS_END = parseInt(process.env.WORKING_HOURS_END);
        const message = {to, content, subject} = req.body;
        const now = new Date();

        ///
        // Emails will be only sent between 8:00 AM to 5:00 PM
        ///
        if(now.getHours()>= WORKING_HOURS_START && now.getHours()<= WORKING_HOURS_END){
            EmailHelper.sendMail({
                ...message
            }, (err, result) => {
                const status = err ? 'FAILED' : 'SENT'
                Email.create({
                    ...message,
                    status
                }, 
                (err, email) => {
                    if (err) return res.status(500).send("There was a problem adding the information to the database.");
                    console.log(email._id.toString());
                    res.set(200).send({
                        id: email._id.toString(),
                        status
                    });
                });
            })
        } else {
            Email.create({
                ...message,
                status: 'QUEUED'
            }, 
            function (err, email) {
                if (err) return res.status(500).send("There was a problem adding the information to the database.");
                console.log(email);
                res.status(200).send({
                    id: email._id.toString(),
                    status: 'QUEUED'
                });

            });
        }
        
    } catch (e) {
        res.status(500).send("There was a problem in request data.");
    } 
    
});

// RETURNS ALL THE EMAILS IN THE DATABASE
// router.get('/', function (req, res) {
//     Email.find({}, function (err, emails) {
//         if (err) return res.status(500).send("There was a problem finding the emails.");
//         res.status(200).send(emails);
//     });
// });

// GETS A SINGLE EMAIL FROM THE DATABASE
router.get('/:id', function (req, res) {
    Email.findById(req.params.id, function (err, email) {
        if (err) return res.status(500).send("There was a problem finding the email.");
        if (!email) return res.status(404).send("No email found.");
        res.status(200).send({
            id: email._id,
            status: email.status
        });
    });
});

// DELETES A EMAIL FROM THE DATABASE
router.delete('/:id', async function (req, res) {
    try {
        let doc = await Email.findOne({_id: req.params.id, status: 'QUEUED'})
        if(doc){
            await doc.remove() 
            res.status(200).send({
                id: doc._id.toString(),
                deleted: true
            });
        }else{
            res.status(200).send({
                id: req.params.id,
                deleted: false
            });
        }
    } catch (e) {
        console.log(e);
        res.status(200).send({
            id: req.params.id,
            deleted: false
        });
    }
    
});

// UPDATES A SINGLE EMAIL IN THE DATABASE
// router.put('/:id', function (req, res) {
//     Email.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, email) {
//         if (err) return res.status(500).send("There was a problem updating the email.");
//         res.status(200).send(email);
//     });
// });


module.exports = router;