const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../secret");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: smtpUserName,
      pass: smtpPassword,
    },
  });

  const sendEmailWithNM = async(emailData)=>{
  try {
    const options = {
        from: smtpUserName, // sender address
        to: emailData.email, // list of receivers
        subject: emailData.subject, // Subject line
        html: emailData.html, // html body
        }
    
        const info = await transporter.sendMail(options);
    
        console.log("Message sent: %s", info.messageId);

  } catch (error) {
    console.error('some thing went wrong when sending mail',error);
    throw error;
  }
  


  }

  module.exports = sendEmailWithNM;