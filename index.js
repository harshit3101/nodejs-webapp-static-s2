const expressApp = require('./configurations/server.js');
const routeTest = require('./routes/routeTest/routeTest.js');
const path = require('path');
const s2Route = require('./routes/s2Route/s2Route.js');
const homepage = require('./routes/homepage/homepage.js');
const utilRoutes = require('./routes/utils/util.js');
const passport = require('passport');

expressApp.get('/', (req, res)=> {
    if(req.isAuthenticated()){
        res.redirect('/homepage');
    }else{
        res.sendFile(path.join(__dirname,'/login.html'));
    }
});


expressApp.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user)
	console.log('successfully logged in');
    res.redirect('/homepage');
});

expressApp.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

expressApp.use('/routeTest',routeTest);
expressApp.use('/s2',s2Route);
expressApp.use('/homepage',homepage);
expressApp.use('/utils',utilRoutes);


expressApp.get('*', function(req, res) {
    res.redirect('/');
});