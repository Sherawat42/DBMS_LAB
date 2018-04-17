'use strict';
const nodemailer = require('nodemailer');
var cred = require('./creds.js');

var transporter = nodemailer.createTransport('SMTP', {
	service: 'Gmail',
	auth: {
		user: cred.user,
		pass: cred.pass
	}
});

var send_mail = function(to_mail, subject_text, content) {
    let mailOptions = {
        from: 'Jesus <mrworldwide42@tutanota.com>',
        to: to_mail,
        subject: subject_text,
        text: content,
        html: ''
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

module.exports = send_mail;
