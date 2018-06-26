/**
 * Created by jccho on 2018. 4. 5..
 */

var URL    = require('url');
var express = require('express');
var router = express.Router();

var madmin_notice = require("../model/madmin_notice");

router.get("/notice/list", function(req, res) {

    res.render('admin/notice/list', {});
});


router.post("/notice/listJson", function(req, res) {
    var page = req.body.page;


    madmin_notice.adminNoticeCount(function(err, rows) {
        var total = rows[0].TOTAL;
        total = Math.ceil(total / 20);
        madmin_member._sp_ADMIN_NOTICE_LIST(page, function(err, rows) {
            var list = rows[0];
            var jsonData = {
                total : total
                ,list : list
            };
            res.send(jsonData);
            //res.send(rows)
        });
    });

});

module.exports = router;