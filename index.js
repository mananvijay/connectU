const express = require('express');
const app = express();
const port = 8000;
app.listen(port, function(err){
    if(err){
        console.log(`OOPS, Error Occurred ${err}`);
    }
    console.log(`Express Working smoothly on port: ${port}`);
});