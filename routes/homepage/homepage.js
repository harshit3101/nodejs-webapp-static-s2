const express = require('express');
const router = express.Router();
const path = require('path');
const connectEnsureLogin = require('connect-ensure-login');

router.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(path.join(__dirname,'/homepage.html'));
});

module.exports = router;