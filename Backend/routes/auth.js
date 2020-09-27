const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    const userExistsAlready = await User.findOne({email: req.body.email});
    if (userExistsAlready) return res.status(400).send("Email Already Exists")

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        gender: req.body.gender,
        age: req.body.age,
    });


    try {
        const savedUser = await user.save();
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send("Could not save user")
    }
});


router.post("/login", async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send("User not on the Platform")


        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Incorrect Password")

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.header('authToken', token).send(token);
    } catch (e) {
        throw (e)
    }
});


module.exports = router;
