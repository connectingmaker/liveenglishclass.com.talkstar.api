/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var URL    = require('url');
var express = require('express');
var router = express.Router();

var mstudy = require("../model/mstudy");
router.get("/list", function(req, res) {
    var uid = req.query.uid;
    if(uid == null) {
        var json = {
            err_code : "E01"
            ,data : []
        }

        res.send(json);
    } else {
        mstudy._sp_STUDY_LIST(uid, function(err, rows) {
            var data = rows[0];

            var json = {
                err_code : "000"
                ,data : data
            }

            res.send(json);
        });
    }
});

router.get("/chapter", function(req, res) {
    var uid = req.query.uid;
    var classes_code = req.query.classes_code;



    mstudy._sp_STUDY_CHAPTER_LIST(uid, classes_code, function(err, rows) {
        var data = rows[0];

        var json = {
            err_code : "000"
            ,data : data
        }

        res.send(json);
    });


});

module.exports = router;