const express = require("express");
const router = express.Router();
const ProductSchema = require("../schema/product");
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");

// const pipeline = promisify(require("stream").pipeline)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadProduct", upload.single("image"), (req, res) => {
  const {
    body: { prodName, description, price, redirectUrl, productLink, userId },
    file,
  } = req;

  // console.log(description, prodName, price, redirectUrl, productLink, userId);

  // console.log(file);

  // const fileName = prodName + Math.floor(Math.random() * 1000) + file.detectedFileExtension

  ProductSchema.findOne({ productName: prodName }).then((data) => {
    if (data) {
      res.send({
        err_message: "Product name already exists",
      });
    } else {
      let newProduct = new ProductSchema({
        userId,
        description,
        productName: prodName,
        productLink,
        price,
        img: {
          data: fs.readFileSync("images/" + file.filename),
          contentType: file.mimetype,
        },
      });

      try {
        newProduct.save().then((product) => {
          // console.log(product);
          res.status(200).send({
            message: `Payment Link saved successfully`,
            product,
          });
        });
      } catch (error) {
        console.log("saving payment link error ", error);
      }
    }
  });
});

router.get("/getAllProducts", (req, res) => {
  ProductSchema.find()
    .then((data) => res.send(data))
    .catch((error) => res.send(error));
});

module.exports = router;
