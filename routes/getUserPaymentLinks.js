const express = require("express");
const router = express.Router();
const paymentLinks = require("../schema/paymentLink");

router.post("/", (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  paymentLinks.find({ userId }).then((data) => {
    res.send({
      data,
    });
  });
});

router.post("/single", (req, res) => {
  const { id } = req.body;
  paymentLinks.findById({ _id: id }).then((data) => {
    res.send({
      data,
    });
  });
});

router.put("/disable_payment_links", (req, res) => {
  const { id } = req.body;
  paymentLinks
    .findByIdAndUpdate({ _id: id }, { status: "disabled" })
    .then((data) => {
      res.send({
        data,
      });
    })
    .catch((err) => res.send(err));
});

router.put("/enable_payment_links", (req, res) => {
  const { id } = req.body;
  paymentLinks
    .findByIdAndUpdate({ _id: id }, { status: "active" })
    .then((data) => {
      res.send({
        data,
      });
    })
    .catch((err) => res.send(err));
});

router.delete("/deleteLink", (req, res) => {
  const { id } = req.query;
  console.log("id to delete",id);
  paymentLinks
    .findByIdAndDelete(id)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;
