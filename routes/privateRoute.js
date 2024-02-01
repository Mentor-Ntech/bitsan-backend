const bcrypt = require("bcrypt");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const router = express.Router();
const user = require("../schema/user");
const { decrypt } = require("../utils/privateKeyEncrypt");

router.post("/", function (req, res) {
  const { bitsanAccessToken, bitsanRefreshToken } = req.body;
  if (!bitsanAccessToken) {
    res.status(404).send({ message: "token not found" });
  } else {
    console.log("access token", bitsanAccessToken);
    try {
      const tokenPayload = jsonwebtoken.verify(
        bitsanAccessToken,
        "BITSANSREGISTERATIONSALT"
      );
      const { email } = tokenPayload;
      user.findOne({ email }).then((user) => {
        if (user) {
          res.status(200).send({
            user: {
              fullname: user.fullName,
              email: user.email,
              country: user.country,
              address: user.address,
              privateKey: user.privateKey,
              businessName: user.businessName,
              userId: user._id
            },
          });
        } else {
          res.status(403).send({ error, message: "invalid token" });
        }
      });
    } catch (error) {
      if (!bitsanRefreshToken) {
        res.status(404).send({
          error,
          msg: "invalid access token && refresh token is not found",
        });
      } else {
        console.log("ref token", bitsanRefreshToken);
        try {
          const refreshTokenPayload = jsonwebtoken.verify(
            bitsanRefreshToken,
            "BITSANSREFRESHTOKENSALT"
          );
          const { email } = refreshTokenPayload;
          const accessToken = jsonwebtoken.sign(
            { email },
            "BITSANSREGISTERATIONSALT",
            { expiresIn: "10s" }
          );

          user.findOne({ email }).then((user) => {
            // decrypt(user.privateKey)
            // console.log(user.privateKey)
            if (user) {
              res.status(200).send({
                user: {
                  fullname: user.fullName,
                  email: user.email,
                  country: user.country,
                  address: user.address,
                  // privateKey: decrypt(user.privateKey),
                  privateKey: user.privateKey,
                  businessName: user.businessName,
                  userId: user._id
                },
                accessToken,
                msg: "new access token was sent",
              });
            }
          });
        } catch (error) {
          res
            .status(403)
            .send({ error, message: "invalid refresh token please login" });
        }
      }
    }
  }
});

module.exports = router;
