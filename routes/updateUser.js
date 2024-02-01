const express = require("express");
const router = express.Router();
const user = require("../schema/user");
const bcrypt = require("bcrypt");

router.put("/updateFullName", (req, res) => {
  const { fullName, _id } = req.body;

  user
    .findByIdAndUpdate(_id, { fullName })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.put("/updatePassword", (req, res) => {
  const { _id, password, previousPassword } = req.body;
  user
    .findById(_id)
    .then(async (data) => {
      const comparePassword = await bcrypt.compare(
        previousPassword,
        data.password
      );
      if (comparePassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user
          .findByIdAndUpdate(_id, { password: hashedPassword })
          .then((data) => {
            res.send({data,message:"password updated"});
          })
          .catch((err) => res.send(err));
      } else {
        res.send({ message: "Previous password is not valid" });
      }
    })
    .catch((error) => res.send(error.message));
});

module.exports = router;
