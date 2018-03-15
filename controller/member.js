/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();


router.get("/userJoinSuccess", function(req,res) {
    var json = {
        "ERR_CODE" : "000"
        ,"ERR_MSG" : "OK"
    };

    res.send(json);
});

router.post("/userJoinSuccess", function(req, res) {
    var json = {
        "ERR_CODE" : "000"
        ,"ERR_MSG" : "OK"
    };

    console.log(req.body);


    res.send(json);
});

module.exports = router;