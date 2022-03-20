const router = require('express').Router();
const s2 = require('s2-geometry').S2;
const connectEnsureLogin = require('connect-ensure-login');

router.post('/latLngToKey', connectEnsureLogin.ensureLoggedIn(), latLngToKeyHandler);


module.exports = router;


function latLngToKeyHandler(req, res){
    console.log("latLngToKeyHandler  called");
    let location = req.body;
    res.send({
        time: Date.now(),
        latLngToKey: s2.latLngToKey(location?.latitude, location?.longitude, 12)
    });
}

