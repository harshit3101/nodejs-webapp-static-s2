const express = require('express');
const router = express.Router();
const path = require('path');
const user = require('../../models/user.js');
const ESqueries = require('../../services/elasticSearchQueries');

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
          ESqueries.addDocumentToMongoUsers(result);
          res.status(200).json({msg:"user succesfully registered in DataBase"});
        }
      });
     
  }else{
    res.status(400).json("Something went wrong");
  }


});

module.exports = router;