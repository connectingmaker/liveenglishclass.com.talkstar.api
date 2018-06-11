var URL    = require('url');
var express = require('express');
var router = express.Router();
//
// var madmin = require("../model/madmin");

/**** 브랜드 카테고리 대분류 VIEW *****************/
router.get('/', function(req, res) {

    res.render('admin/login', { title: 'Express', layout: 'layout/single_page', "layout extractScripts": true });
});

/**** 브랜드 카테고리 대분류 VIEW *****************/
router.get('/memberList', function(req, res) {

    res.render('admin/memberList', { });
});


module.exports = router;