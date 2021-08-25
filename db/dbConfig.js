const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("Connected to the database"))
.catch((err)=> console.log('connection failed with database\n', err));