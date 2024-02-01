const bcrypt = require("bcrypt");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const router = express.Router();
const user = require("../schema/user");

router.post("/", function (req, res) {
  const { email, password } = req.body;
  user.findOne({ email }).then(async (user) => {
    if (!user) {
      res.status(404).send({ message: "Email not found" });
    } else {
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        const accessToken = jsonwebtoken.sign(
          { email },
          "BITSANSREGISTERATIONSALT",
          { expiresIn: "10s" }
        );
        const refreshToken = jsonwebtoken.sign(
          { email },
          "BITSANSREFRESHTOKENSALT",
          { expiresIn: "500h" }
        );
        res.status(200).send({
            user: {
              fullname: user.fullName,
              email: user.email,
              country: user.country,
              address: user.address,
              businessName: user.businessName,
              privateKey: user.privateKey,
              userId: user._id
            },
            accessToken,
            refreshToken
        });
      } else {
        res.status(404).send({ message: "password mismatch" });
      }
    }
  });
});

router.get("/", function (req, res) {
  res.send({
    welcome: "yoroshku isashiburi twilight kun",
  });
});

module.exports = router;
