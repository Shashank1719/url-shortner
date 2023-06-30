const DB = process.env.MONGO_URI;
const mongoose = require('mongoose');

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
).then(console.log("Connection Successfull")).catch(error => console.log(error));