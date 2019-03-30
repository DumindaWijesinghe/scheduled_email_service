const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//
// Message object structure
// {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: '',
//   text: '',
//   html: '<b></b>',
// }

module.exports = {
    sendMail: function(data,cb) {
        const {from, to, subject, content} = data
        let message = {
            to,
            from: 'noreply@example.com',
            subject,
            text: content,
            html: '<p>'+content+'</p>',
        }

        sgMail.send(message)
        .then((response) => {
            const {headers, body} = response;
            cb(null,response)
        })
        .catch(error => {
            console.error(error.toString());
            const {message, code, response} = error;    
            cb(error)
        });
    },
    
    sendMailAsync: async function(data) {
        const {from, to, subject, content} = data
        let message = {
            to,
            from: 'noreply@example.com',
            subject,
            text: content,
            html: '<p>'+content+'</p>',
        }
        return sgMail.send(message)
    }

}