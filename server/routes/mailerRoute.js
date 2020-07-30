const express = require("express");
const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars")
const app = express();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    mailOptions: function (sender, receiver, subject, text) {

        const emailOptions = {
            from: sender,
            to: receiver,
            subject: subject,
            text: text
        };
        return emailOptions;
    }
    ,

    newApplicantEmail: function (emailOptions) {
        transporter.sendMail(emailOptions, (error, response) => {
            if (error) {
                console.log(error);
            } else {
                console.log(emailOptions)
                console.log("successfully sent email")
            }
        });
    },
};
