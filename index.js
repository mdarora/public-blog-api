const express = require("express");
const cors = require('cors');
const app = express();

require('dotenv').config();

app.get("/", (req, res) => {
    res.json({message: "home route of server"});
});
app.use(cors());
app.use(express.json());
app.use(require('cookie-parser')());

app.use("/api", require('./routes/auth'));
app.use("/api", require('./routes/posts'));
app.use("/api", require('./routes/comments'));


require("./db/dbConfig");
app.listen(process.env.PORT, () =>{
    console.log("listening on port : " + process.env.PORT);
})