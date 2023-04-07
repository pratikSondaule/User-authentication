const express = require("express");
const jwt = require("jsonwebtoken")
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth")

const router = express.Router();

router.post("/register", async (req, res) => {

    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Fill the form comepletly" });
    }

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "Email already exist" });
        }

        const hashed_password = await bcrypt.hash(password, 12);
        const hashed_cpassword = await bcrypt.hash(cpassword, 12);


        user = new User({ 
            name, 
            email, 
            password: hashed_password, 
            cpassword: hashed_cpassword 
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" })


    } catch (err) {
        console.log(err);
    }


});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(422).json({ error: "Fill the form comepletly" });
        }

        let user = await User.findOne({ email: email });

        if (!user) {
            res.status(400).json({ error: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credentials" })
        }
        
        const token = jwt.sign({ _id: user._id }, "sothisisasecretkeyformernproject", {
            expiresIn: "1h"
        });

        res.status(200).json({ message: "User login successfully", token })

    } catch (err) {
        console.log(err);
    }

});

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
})



module.exports = router;