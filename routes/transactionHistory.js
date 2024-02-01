const transactionHistory = require("../schema/transactionHistory");
const express = require("express");
const sendMail = require("./sendMail");
const router = express.Router();

router.post("/saveLinkTransaction", (req, res) => {
  const {
    from,
    amount,
    linkId,
    userId,
    type,
    userEmail,
    linkTitle,
    productName,
    addressPayout,
    addressTo,
    bankTopUp,
    BankPaymentOut,
    productPay
  } = req.body;
  try {
    const newHistory = new transactionHistory({
      from,
      amount,
      linkId,
      userId,
      type,
    });
    newHistory
      .save()
      .then((data) => {
        // handeling sendMail after transaction is saved
        if (type === "Payment in" && !productPay) {
          let recipient_message = `You have been credited with ${amount}ether(s) on your ${linkTitle} payment link, from ${from} to your bitsan account's address, please login to verify the transaction on your transaction history.`;
          let subject = "Bitsan payment in alert";
          sendMail(userEmail, recipient_message, subject);
        } else if(type === "Payment in" && productPay){
          let recipient_message = `You have been credited with ${amount}ether(s) for your ${productName}, from ${from} to your bitsan account's address, please login to verify the transaction on your transaction history.`
          let subject = "Bitsan payment in alert";
          sendMail(userEmail, recipient_message, subject);
        }else if (type === "Payment out" && !BankPaymentOut) {
          let subject = "Bitsan payment out alert";
          let recipient_message = `You have been debited with ${amount}ether(s) on your to your bitsan account's address and will you will be credited on ${addressTo} as requested on your payout, please login to verify the transaction on your transaction history.`;
          sendMail(userEmail, recipient_message, subject);
        } else if (BankPaymentOut && type === "Payment out") {
          let subject = "Bitsan payment out alert";
          let recipient_message = `You have been debited with ${amount}ether(s) on your to your bitsan account's address and will you will be on your bank account, as requested on your payout, please login to verify the transaction on your transaction history.`;
          sendMail(userEmail, recipient_message, subject);
        } else if (addressPayout) {
          let subject = "Bitsan payment out alert";
          let recipient_message = `You have succesfully ${amount}ether(s) from your to your bitsan account's address and will you will be credited on ${addressTo} as you have requested, please login to verify the transaction on your transaction history.`;
          sendMail(userEmail, recipient_message, subject);
        } else if (bankTopUp && type === "Top up") {
          let subject = "Bitsan Top up alert";
          let recipient_message = `You made a top up of ${amount}ether(s) to your to your bitsan account's address from your bank account, please login to verify the transaction on your transaction history.`;
          sendMail(userEmail, recipient_message, subject);
        } else if (type === "Top up" && !bankTopUp) {
          let subject = "Bitsan Top up alert";
          let recipient_message = `You made a top up of ${amount}ether(s) to your to your bitsan account's address from ${from}, please login to verify the transaction on your transaction history.`;
          sendMail(userEmail, recipient_message, subject);
        }
        res.send(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
});

router.get("/getLinkTransactions", (req, res) => {
  const { linkId } = req.query;
  transactionHistory
    .find({ linkId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.get("/getAllTransactionHistory", (req, res) => {
  const { userId } = req.query;
  console.log("userid ", userId);
  transactionHistory
    .find({ userId })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;
