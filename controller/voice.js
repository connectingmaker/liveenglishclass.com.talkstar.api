/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();


var mvoice = require("../model/mvoice");
var mecab = require('mecab-ya');


router.get("/test", function(req, res) {
    var text = '아버지가 방에 들어가신다';


    mecab.nouns(text, function (err, result) {
        console.log(result);
        /*
            [ '아버지', '방' ]
        */
    });


    res.send("1111");
    console.log("OK");
});

module.exports = router;