const express = require("express");
const router = express.Router();
const PaymentLinkSchema = require("../schema/paymentLink");

router.post("/", (req, res) => {
  const {
    email,
    userId,
    title,
    description,
    confirmationType,
    redirectUrl,
    confirmationText,
    paymentLink,
  } = req.body;

  PaymentLinkSchema.findOne({ title }).then((data) => {
    if (data) {
      res.send({
        err_message: "Title already exists",
      });
    } else {
      let newPaymentLink = new PaymentLinkSchema({
        email,
        userId,
        description,
        title,
        confirmationType,
        redirectUrl,
        confirmationText,
        paymentLink,
      });

      try {
        newPaymentLink.save().then((paymentLink) => {
          res.status(200).json({
            message: `Payment Link saved successfully`,
            paymentLink,
          });
          console.log(paymentLink);
        });
      } catch (error) {
        console.log("saving payment link error ", error);
      }
    }
  });
});

module.exports = router;
