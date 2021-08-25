const express = require("express");
const app = express();

require('dotenv').config();

app.get("/", (req, res) => {
    res.json({message: "home route of server"});
});


require("./db/dbConfig");
app.listen(process.env.PORT, () =>{
    console.log("listening on port : " + process.env.PORT);
})