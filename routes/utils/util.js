const router = require('express').Router();
const queryString = require('../../services/geospatialQuery').queryString;
const connectEnsureLogin = require('connect-ensure-login');

router.post('/es/getNearestPoints', connectEnsureLogin.ensureLoggedIn(), getNearestPointsHandler);


module.exports = router;






async function getNearestPointsHandler(req, res){
    console.log("getNearestPointsHandler  called");
    let location = req.body;
    let points = await queryString(location);
    
    res.send({
        time: Date.now(),
        points: points
    });
}

