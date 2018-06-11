/**
 * Created by jccho on 2018. 4. 5..
 */

var URL    = require('url');
var express = require('express');
var router = express.Router();

var madmin = require("../model/madmin");

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