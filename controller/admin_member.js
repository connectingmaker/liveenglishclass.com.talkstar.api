/**
 * Created by jccho on 2018. 4. 5..
 */

var URL    = require('url');
var express = require('express');
var router = express.Router();

var madmin_member = require("../model/madmin_member");

router.get("/member/list", function(req, res) {

    res.render('admin/member/list', {});
});

router.post("/member/listJson", function(req, res) {
    var page = req.body.page;
    var search_type = req.body.search_type;
    var search_name = req.body.search_name;

    madmin_member._sp_ADMIN_MEMBER_LIST(page, search_type, search_name, function(err, rows) {
        var list = rows[0];
        var jsonData = {
            list : list
        };
        res.send(jsonData);
        //res.send(rows)
    });
});


module.exports = router;