const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userSignup = require("./routes/userSignup");
const getUsers = require("./routes/getUsers");
const private = require("./routes/privateRoute");
const userLogin = require("./routes/login");
const createPaymentLink = require("./routes/createPaymentLink");
const verifyLink = require("./routes/verifyLink");
const getUserPaymentLink = require("./routes/getUserPaymentLinks");
const getUserProductLink = require("./routes/getUserProduct");
const { decrypt, encrypt } = require("./utils/privateKeyEncrypt");
const saveLinkTransaction = require("./routes/transactionHistory");
const uploadProduct = require("./routes/createProduct");
const userUpdate = require("./routes/updateUser");
const transferToUser = require("./routes/tansferToUser");
const sendMail = require("./routes/sendMail");
const sendContactMail = require("./routes/sendContactMail")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  // process.env.DB_CONNECT_URI,
  "mongodb+srv://bitsanAdmin:bitsanDbPwd@cluster0.ulhvpm6.mongodb.net/bitsan?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("database connected")
);

app.use("/signup", userSignup);
app.use("/login", userLogin);
app.use("/private", private);
app.use("/getUsers", getUsers);
app.use("/createPaymentLink", createPaymentLink);
app.use("/verifyLink", verifyLink);
app.use("/getUserPaymentLink", getUserPaymentLink);
app.use("/transactionHistory", saveLinkTransaction);
app.use("/products", uploadProduct);
app.use("/getUserProductLink", getUserProductLink);
app.use("/userUpdate", userUpdate);
app.use("/transferToUser", transferToUser);
app.use("/sendContactMail", sendContactMail);

// sendMail();

app.get("/", (req, res) => {
  res.status(200).send({
    greetings: "welcome to bitsan we are happy to see you online",
  });
});
// console.log(encrypt("yo hey guy"))
// console.log(encrypt("yo hey guy"))
// console.log(decrypt('be64aa749d0afa8add724b4186384620'))
app.listen(process.env.PORT || 5000, () => console.log("user hit the server"));
