const router = require('express').Router();

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
        return res.json({message: findByUsername});
    } catch (error) {
        return res.json({error: "Something went wrong!"})
    }

    return res.send("register here");
});

module.exports = router;