const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../db/models/user');

router.post("/register", async (req, res)=>{
    const {name, username, password, cpassword} = req.body;

    if (!name, !username, !password, !cpassword){
        return res.json({error: "All fields are required!"});
    } else if (password !== cpassword){
        return res.json({error: "Both passwords must be same!"});
    }

    try {
        const findByUsername = await User.find({username});
        if (findByUsername.length !== 0){
            return res.json({error: "Username already exist."});
        }

        const hashedpass = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, username,
            password: hashedpass
        });
        await newUser.save();
        return res.json({message: "Successfully registered", newUser});

    } catch (error) {
        console.log("Catched on register: ", error);
        return res.json({error: "Something went wrong!"})
    }
});

module.exports = router;