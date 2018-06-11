/**
 * Created by jccho on 2018. 4. 5..
 */

var URL    = require('url');
var express = require('express');
var router = express.Router();

var mcommand = require("../model/mcommand");
router.get("/list", function(req, res) {


    mcommand._sp_COMMAND_LIST(function(err, rows) {
        var data = rows[0];

        var json = {
            err_code : "000"
            ,data : data
        }

        res.send(json);
    });

});

router.get("/memberCommand", function(req, res) {

    var uid = req.query.uid;
    mcommand._sp_MEMBER_COMMAND_LIST(uid, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0];

        var json = {
            data : data
        };

        console.log(json);

        res.send(json);
    });
});


module.exports = router;