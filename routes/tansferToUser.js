const express = require("express");
const https = require("https");
const sendMail = require("./sendMail");
const router = express.Router();

router.post("/", (req, res) => {
  const { fullName, accountNumber, bankCode, amount, rceipientEmail } =
    req.body;
  const params = JSON.stringify({
    type: "nuban",
    name: fullName,
    account_number: accountNumber,
    bank_code: bankCode,
    currency: "NGN",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transferrecipient",
    method: "POST",
    headers: {
      Authorization: "Bearer sk_test_3c8a5c6ad09a0d29f4d4b26031b9d0bc9034d3d9",
      "Content-Type": "application/json",
    },
  };

  const httpReq = https
    .request(options, (res1) => {
      let data = "";

      res1.on("data", (chunk) => {
        data += chunk;
      });

      res1.on("end", () => {
        data = JSON.parse(data);

        console.log("recipient", data.data.recipient_code);

        const params = JSON.stringify({
          source: "balance",
          amount: amount * 100,
          recipient: rceipientEmail,
          recipient: data.data.recipient_code,
          reason: "transfer-on-payout",
        });

        const options = {
          hostname: "api.paystack.co",
          port: 443,
          path: "/transfer",
          method: "POST",
          headers: {
            Authorization:
              "Bearer sk_test_3c8a5c6ad09a0d29f4d4b26031b9d0bc9034d3d9",
            "Content-Type": "application/json",
          },
        };

        const httpReq1 = https
          .request(options, (res2) => {
            let data = "";

            res2.on("data", (chunk) => {
              data += chunk;
            });

            res2.on("end", () => {
              res.send(JSON.parse(data));
              let subject = "Request for payout"
              let recipient_message = "Transaction has been successfully initiated, waiting for transfer to complete, this could take 30minutes to drop into your bank account"
              sendMail(rceipientEmail,recipient_message,subject)
              sendMail("bitsanpaymentpoint@gmail.com","A payout transaction has been initiated and pending for your approval, please check this out your paystack transfer dashboard as the user is waiting for the transfer approval.",subject)
              console.log(JSON.parse(data));
            });
          })
          .on("error", (error) => {
            res.send(error);
          });

        httpReq1.write(params);
        httpReq1.end();
      });
    })
    .on("error", (error) => {
      res.send(error);
    });

  httpReq.write(params);
  httpReq.end();
});

module.exports = router;
