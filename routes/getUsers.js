const express = require("express");
const router = express.Router();
const user = require("../schema/user");

router.get("/", (req, res) => {
  user.find().then((data) => {
    res.send({
      data,
    });
  });
});

module.exports = router;
