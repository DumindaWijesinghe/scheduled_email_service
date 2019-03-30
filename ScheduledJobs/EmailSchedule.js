const schedule = require('node-schedule');
const Email = require('../email/Email');
const EmailHelper = require('../helpers/EmailHelper')

const WORKING_HOURS_START = parseInt(process.env.WORKING_HOURS_START);
const WORKING_HOURS_END = parseInt(process.env.WORKING_HOURS_END);
const RETRY_INTERVAL = parseInt(process.env.RETRY_INTERVAL);

///
// Run a scheduled job at minute 0 past every 2nd hour from 8:00 AM through 5:00 PM
// this task will find all QUEUED emails and resend them 8:00 AM
// this task will retry to send FAILED emails every 2 hours between 8:00 AM through 5:00 PM
///
schedule.scheduleJob(`0 ${WORKING_HOURS_START}-${WORKING_HOURS_END}/${RETRY_INTERVAL} * * *`, async function(){
    Email.find({status: { $in: ['QUEUED','FAILED']}}).exec(async function (err, emails) { 
        if(!err){
            try {
                console.log(emails);
                const promises = emails.map(scheduleMailAsync);
                // wait until all promises are resolved
                await Promise.all(promises)
            } catch (e) {
                console.log('3',e);
            }
            
        }
    });
});

async function scheduleMailAsync(item) {
    try {
        const msg = {to, subject, content} = item;
        const result = await EmailHelper.sendMailAsync(msg);
        if (result) {
            try {
                item.status = 'SENT';
                await item.save();
            } catch (e) {
                console.log(e);
            }   
        }
        console.log(item);
    } catch (err) {
        console.log(err);
        item.status = 'FAILED';
        await item.save();
    }  
}