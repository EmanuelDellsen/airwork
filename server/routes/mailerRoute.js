const express = require("express");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: "email-templates",
    layoutsDir: "email-templates",
    defaultLayout: "",
  },
  viewPath: "email-templates",
  extName: ".handlebars",
};
transporter.use("compile", hbs(handlebarOptions));

module.exports = {
  newApplicantEmailOptions: function (
    sender,
    receiver,
    subject,
    template,
    workOpportunityCreator,
    newApplicantUser,
    workOpportunity
  ) {
    const emailOptions = {
      from: sender,
      to: receiver,
      subject: subject,
      template: template,
      context: {
        workOpportunityCreator: workOpportunityCreator,
        newApplicantUser: newApplicantUser,
        workOpportunity: workOpportunity,
      },
    };
    return emailOptions;
  },
  inviteMemberEmailOptions: function (
    sender,
    receiver,
    subject,
    template,
    userThatInvited,
    mongodbId
  ) {
    const emailOptions = {
      from: sender,
      to: receiver,
      subject: subject,
      template: template,
      context: {
        userThatInvited: userThatInvited,
        linkToRegistration: "http://localhost:8080/register?id=" + mongodbId
      },
    };
    return emailOptions;
  },

  newEmail: function (emailOptions) {
    transporter.sendMail(emailOptions, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log(emailOptions);
        console.log("successfully sent email");
      }
    });
  },
};
