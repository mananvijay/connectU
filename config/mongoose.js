const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/connectu');

const db = mongoose.connection;

db.on('error', console.error.bind("Database not connected"));

db.once('open', function(){
    console.log('Database connected');
});

module.exports = db;