const expressApp = require('./configurations/server.js');
const routeTest = require('./routes/routeTest/routeTest.js');
const path = require('path');
const s2Route = require('./routes/s2Route/s2Route.js');
const homepage = require('./routes/homepage/homepage.js');
const utilRoutes = require('./routes/utils/util.js');
const registerRoutes = require('./routes/register/register.js');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

expressApp.get('/login', (req, res)=> {
    if(req.isAuthenticated()){
        res.redirect('/homepage');
    }else{
        res.sendFile(path.join(__dirname,'/login.html'));
    }
});


expressApp.post('/authenticate', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user)
	console.log('successfully logged in');
    res.redirect('/homepage');
});

expressApp.get('/logout', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
    req.logout();
    res.redirect('/login');
});

expressApp.use('/routeTest',routeTest);
expressApp.use('/s2',s2Route);
expressApp.use('/homepage',homepage);
expressApp.use('/utils',utilRoutes);
expressApp.use('/register',registerRoutes);


expressApp.get('*', function(req, res) {
    res.redirect('/login');
});