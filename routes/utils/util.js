const router = require('express').Router();
const ESqueries = require('../../services/elasticSearchQueries');
const connectEnsureLogin = require('connect-ensure-login');
const user = require('../../models/user.js');


router.post('/es/getNearestPoints', connectEnsureLogin.ensureLoggedIn(), getNearestPointsHandler);

router.get('/delete-user', connectEnsureLogin.ensureLoggedIn(), deleteUser);

module.exports = router;

async function getNearestPointsHandler(req, res){
    console.log("getNearestPointsHandler  called");
    let location = req.body;
    let points = await ESqueries.queryString(location);
    
    res.send({
        time: Date.now(),
        points: points
    });
}

async function deleteUser(req, res){
    

    if(req?.user?.username){

        user.findOneAndRemove({username: req?.user?.username},  (err, result)=> {
            if(err){
                res.status(400).json({err});
            }else{
                ESqueries.deleteDocumentFromMongoUsers(req.user.username);
                res.status(200).json({msg:"user removed From DataBase"});
            }
        });

    }

}