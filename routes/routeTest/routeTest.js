const express = require('express');
const router = express.Router();
const path = require('path');

//middleWare
router.use((req, res, next)=> {
    req.testName = 'Harshit';
    console.log('Middel caleed beofre');
    next();
    console.log('Middel caleed after');
})

router.get('/', (req, res) => {
    let pathTemp = path.join(__dirname,'routeTest.html');
    console.log('pathTemp'+pathTemp);
    console.log(req.testName);
    res.sendFile(pathTemp);
});

module.exports = router;