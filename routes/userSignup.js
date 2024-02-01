const express = require('express');
const router = express.Router()
const user= require("../schema/user");
const { encrypt, decrypt } = require('../utils/privateKeyEncrypt');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

router.post("/", async (req, res) => {
    
    const { email, password, fullName, businessName, country,address,privateKey } = req.body

    // const encryptedPrivateKey = encrypt(privateKey)

    const salt = await bcrypt.genSalt(10)
    
    const hashedPassword = await bcrypt.hash(password,salt)

    user.findOne({ email }).then((data) => {
        if (!data) {
            let newUser = new user({
                email,
                fullName,
                password:hashedPassword,
                businessName,
                country,
                address,
                privateKey
            })

            try {
                newUser.save().then((user) => {
                    const accessToken = jsonwebtoken.sign({email},"BITSANSREGISTERATIONSALT",{expiresIn:"10s"}) 
                    const refreshToken = jsonwebtoken.sign({email},"BITSANSREFRESHTOKENSALT",{expiresIn:"500h"}) 
                    res.status(200).json({
                        message:`User created successfully`,    
                        accessToken,
                        refreshToken,
                        user: {
                            fullname: user.fullName,
                            email: user.email,
                            country: user.country,
                            address: user.address,
                            privateKey: user.privateKey,
                            userId: user._id
                          },
                    })
                    console.log(user)
                })
            } catch (error) {
                console.log("saving error ",error);
            }
        } else {
            res.status(403).json({
                message: "User already exists"
            })
        }
    }).catch(error => console.log("error ",error))

})

router.get("/", (req, res) => {
    res.send({
        data: "welcome to signup route"
    })
})

module.exports = router