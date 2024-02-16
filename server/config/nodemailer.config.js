import nodemailer from "nodemailer";
import config from "../config/config.js";
import server from "../server.js";

const user = config.user;
const pass = config.pass;

/**
 * creating transport to send emails
 */
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

/**
 * name - name of the receiver
 * email - email address of the receiver
 * confirmation - confirmation code to login into application
 * @param {String} name 
 * @param {String} email 
 * @param {String} confirmationCode 
 */
const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Email triggered!!");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${config.frontEndURL}/verify-email/${confirmationCode}> Click here</a>
            </div>`,
    })
    .catch((err) => console.log(err));
};
/**
 * name - name of the receiver
 * email - email address of the receiver
 * id - URL Object id i.e user id 
 * @param {String} name 
 * @param {String} email 
 * @param {ObjectId} id 
 */
const sendForgetPasswordEmail = (name, email, id) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please Reset your password",
      html: `<h1>Reset Password</h1>
          <h2>Hello ${name}</h2>
          <p>Please click on the following link to reset your password</p>
          <a href=http://localhost:9000/users/update-password/${id}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};

const sendConfirmationEmailGoogleLogin = (name, email, password) => {
  console.log("Email triggered!!");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Welcome!",
      html: `<h1>Account Created!</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you connecting with us!! Please use ${password} as your temporary password.</p>
            </div>`,
    })
    .catch((err) => console.log(err));
};

const sendTaskCreationEmail = (name, email) => {
  console.log("Email triggered!!");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Welcome!",
      html: `<h1>A New task is Created!</h1>
            <h2>Hello ${name}</h2>
            <p>A new task is created. Please login and check</p>
            </div>`,
    })
    .catch((err) => console.log(err));
};

const sendTaskUpdateEmail = (name, email) => {
  console.log("Email triggered!!");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Welcome!",
      html: `<h1>A New Created!</h1>
            <h2>Hello ${name}</h2>
            <p>A new task is assigned to you. Please login and check.</p>
            </div>`,
    })
    .catch((err) => console.log(err));
};

export {
  sendConfirmationEmail,
  sendForgetPasswordEmail,
  sendConfirmationEmailGoogleLogin,
  sendTaskCreationEmail,
  sendTaskUpdateEmail
};
