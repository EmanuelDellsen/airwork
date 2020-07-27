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

const handlebarOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: 'email_templates/patials',
        layoutsDir: 'email_templates/layouts',
        defaultLayout: '',
    },
    viewPath: 'email_templates',
    extName: '.handlebars',
};

transporter.use('compile', hbs(handlebarOptions));



exports.welcomeMail = (email, name) => transporter.sendMail({
    from: 'Vue Mailer',
    to: email,
    subject: "Account Creation",
    template: "welcome",
    context: {
        user: name
    }
});