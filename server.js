const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('static'))

app.listen(port, ()=> {
    console.log("Server started at port"+ port);
});

module.exports = app;