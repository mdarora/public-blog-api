const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const logoutAuth = require('../middleware/logoutAuth');
const User = require('../db/models/user');

router.post("/register", logoutAuth, async (req, res)=>{
    const {name, username, password, cpassword} = req.body;

    if (!name || !username || !password || !cpassword){
        return res.json({error: "All fields are required!"});
    } else if (password !== cpassword){
        return res.json({error: "Both passwords must be same!"});
    } else if (username.includes(" ") || username.includes("@")){
        return res.json({error: "Username must not contain spaces and @ symbol !"});
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

router.post("/login",  logoutAuth, async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password){
        return res.json({error: "All fields are required!"});
    }

    try {
        const findByUsername = await User.find({username});
        if (findByUsername.length === 0){
            return res.json({error: "Invalid details"});
        }

        const matchHash = await bcrypt.compare(password, findByUsername[0].password);
        if(!matchHash){
            return res.json({error: "Invalid details"});
        }

        const token = jwt.sign({id: findByUsername[0]._id, username: findByUsername[0].username, name: findByUsername[0].name}, process.env.SECRET_KEY);

        res.cookie("token", token);
        return res.json({message: "User loggedin"});

    } catch (error) {
        console.log("Catched on login: ", error);
        return res.json({error: "Something went wrong!"});
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie('token').status(200).json({message: 'logged out'});
});

module.exports = router;