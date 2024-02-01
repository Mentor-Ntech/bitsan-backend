const nodemailer = require("nodemailer");

const sendMail = async (recipient, message, subject) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      secureConnection: false,
      auth: {
        user: "bitsanpaymentpoint@gmail.com",
        pass: "rcfhtbicsjxuhkur",
      },
      tls: {
        rejectUnAuthorized: true,
      },
    });

    var info = await transporter.sendMail({
      to: recipient,
      subject,
      text: message,
    });

    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
