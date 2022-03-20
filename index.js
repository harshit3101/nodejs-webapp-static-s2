const expressApp = require('./server.js');
const routeTest = require('./routeTest/routeTest.js');


expressApp.get('/welcome', (req, res)=> {
    res.send('Welcome');
})

expressApp.use('/routeTest',routeTest);