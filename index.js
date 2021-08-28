const express = require("express");
const app = express();

require('dotenv').config();

app.get("/", (req, res) => {
    res.json({message: "home route of server"});
});

app.use(express.json());
app.use(require('cookie-parser')());
app.use("/api", require('./routes/auth'));


require("./db/dbConfig");
app.listen(process.env.PORT, () =>{
    console.log("listening on port : " + process.env.PORT);
})