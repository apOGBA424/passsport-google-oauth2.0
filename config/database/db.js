
const mongoose = require('mongoose');

const db_conn = mongoose.connect(process.env.MongoDB_URI)
.then(
    ()=>{
        console.log(`database connection successful!\nMongoDB_URI : ${process.env.MongoDB_URI}`);
    })
.catch(err => console.log(err));


module.exports = {db_conn};
