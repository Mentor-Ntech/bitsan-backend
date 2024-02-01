const express = require("express");
const https = require("https");
const sendMail = require("./sendMail");
const router = express.Router();

router.post("/", async (req, res) => {
  const { from, subject, message } = req.body;
  try {
    let subject_text = `you have been contacted by ${from}`;
    let message_text = `${subject_text} \n ${message}`;
    let recipient = "bitsanpaymentpoint@gmail.com";
    sendMail(recipient, message_text, subject);
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

module.exports = router;
