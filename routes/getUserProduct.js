const express = require("express");
const router = express.Router();
const productLinks = require("../schema/product");

router.post("/", (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  productLinks.find({ userId }).then((data) => {
    res.send({
      data,
    });
  });
});

router.post("/single", (req, res) => {
  const { id } = req.body;
  productLinks.findById({ _id: id }).then((data) => {
    res.send({
      data,
    });
  });
});

router.put("/disable_product_links", (req, res) => {
  const { id } = req.body;
  productLinks
    .findByIdAndUpdate({ _id: id }, { status: "disabled" })
    .then((data) => {
      res.send({
        data,
      });
    })
    .catch((err) => res.send(err));
});

router.put("/enable_product_links", (req, res) => {
  const { id } = req.body;
  productLinks
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
  productLinks
    .findByIdAndDelete(id)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;
