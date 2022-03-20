const express = require('express');
const router = express.Router();
const path = require('path');
const user = require('../../models/user.js');
const client = require('../../configurations/es-connection.js');
const handlers = require('../../utils/errorHandle.js');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/register.html'));
});

router.post('/add-user', (req, res) => {

let username = req.body.username;
  let password = req.body.password;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;

  if(username && password && latitude && longitude){
      user.register({ username: username, location: {latitude: latitude , longitude: longitude}, active: false }, password, (err, result)=> {
        if(err){
          res.status(400).json({err});
        }else{
            addDocument(result)
          res.status(200).json({msg:"user succesfully registered in DataBase"});
        }
      });
     
  }else{
    res.status(400).json("Something went wrong");
  }


});



async function addDocument(user){

    const operations = [user]
    .flatMap(doc => [
        { index: { _index: 'mongo-users'}}
        ,{username: doc.username, location: {lat:doc.location.latitude, lon: doc.location.longitude}}
    ]);

    if(operations.length > 0){
        client.bulk({  
            body: operations 
        }).then(
            ...handlers
        ).finally(
            ()=>{
                console.log('Harshit Finally');
            }
        );

    }

}


module.exports = router;