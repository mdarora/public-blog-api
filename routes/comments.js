const router = require('express').Router();
const loginAuth = require("../middleware/loginAuth");

const Comment  = require('../db/models/comment');

router.post("/add-comment", loginAuth, (req, res) => {
    res.json({message: "commented"});
})

module.exports = router;