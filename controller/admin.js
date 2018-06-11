/**
 * Created by jccho on 2018. 4. 5..
 */

var URL    = require('url');
var express = require('express');
var router = express.Router();

var madmin = require("../model/madmin");

router.get("/", function(req, res) {
    res.render('admin/login', {
        layout: 'layout/single_layout',
        "layout extractScripts": true
    });
});


router.get("/login", function(req, res) {
    res.render('admin/login', {
        layout: 'layout/single_layout',
        "layout extractScripts": true
    });
});

router.post("/loginProcess", function(req, res) {
    var admin_id = req.query.admin_id;
    var admin_pw = req.query.admin_pw;
    madmin._sp_ADMIN_LOGIN(admin_id, admin_pw, function(err, rows) {
        if(err) {
            console.log(err);
        }

        res.send(rows[0][0]);
    });
});

router.get("/member/list", function(req, res) {
    res.render('admin/member/list', {
        layout: 'layout/admin_layout',
        "layout extractScripts": true
    });
});


router.get('/memberList', function(req, res) {
    res.render('admin/memberList', { });
});




module.exports = router;