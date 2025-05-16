import nodemailer from "nodemailer";
import { MAIL_USER, MAIL_PASSKEY } from "../configs/config.js";
import Mailgen from "mailgen";

// Creating the transporter for sending the mail from server end point...
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSKEY,
  },
});

// Configuring the mailgenerator for mail body template....
const MailGenerator = new Mailgen({
  theme: "cerberus",
  product: {
    name: "HMS_MERCY",
    link: "http://localhost:5173/",
  },
});

/** POST: http://localhost:7001/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/

const registerMail = async (req, res) => {
  try {
    const { userName, userEmail, text, subject } = req.body;

    // body of the email
    let email = {
      body: {
        name: userName,
        intro:
          text ||
          "Welcome to MERN_Login_App Project! We're very excited to have you on board.",
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    let emailBody = MailGenerator.generate(email);

    let message = {
      from: MAIL_USER,
      to: userEmail,
      subject: subject || "Signup Successful",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return res
      .status(200)
      .send({ msg: "You should receive an email from us." });
  } catch (error) {
    
    return res.status(400).send({
      message: error.message,
    });
  }
};

export default registerMail;
