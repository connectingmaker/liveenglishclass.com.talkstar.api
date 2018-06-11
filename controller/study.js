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

router.get("/start", function(req, res) {
    var uid = req.query.uid;
    var classes_code = req.query.classes_code;
    var chapter_code = req.query.chapter_code;

    mstudy._sp_STUDY_START(uid, classes_code, chapter_code, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0][0];

        mstudy._sp_MEMBER_CLASSES_CHAPTER_PART(uid, data.CLASSES_CODE, data.CHAPTER_CODE, data.PART_CODE, data.ORDERID, 'S', function(err, rows) {
            res.send(data);
        });


    });
});

router.get("/next", function(req, res) {
    var uid = req.query.uid;
    var classes_code = req.query.classes_code;
    var chapter_code = req.query.chapter_code;
    var part_code = req.query.part_code;
    var orderid = req.query.orderid;


    mstudy._sp_STUDY_QUESTION(uid, classes_code, chapter_code, part_code, orderid, function(err, rows) {
        if(err) {
            console.log(err);
        }
        var data = rows[0][0];

        mstudy._sp_MEMBER_CLASSES_CHAPTER_PART(uid, data.CLASSES_CODE, data.CHAPTER_CODE, data.PART_CODE, data.ORDERID, 'E', function(err, rows) {
            mstudy._sp_MEMBER_CLASSES_CHAPTER_PART(uid, data.CLASSES_CODE, data.CHAPTER_CODE, data.PART_CODE, data.ORDERID, 'S', function(err, rows) {
                res.send(data);
            });
        });




    });
});


router.post("/next", function(req, res) {

    var uid = req.query.uid;
    var classes_code = req.query.classes_code;
    var chapter_code = req.query.chapter_code;
    var part_code = req.query.part_code;
    var orderid = req.query.orderid;

    var dataQ = req.body;
    var dataQ_length = Object.keys(dataQ).length;

    console.log(classes_code + "///" + chapter_code + "///" + part_code + "///" + orderid);



    mstudy._sp_STUDY_QUESTION(uid, classes_code, chapter_code, part_code, orderid, function(err, rows) {
        if(err) {
            console.log(err);
        }
        var data = rows[0][0];

        if(dataQ_length == 0) {
            mstudy._sp_MEMBER_CLASSES_CHAPTER_PART(uid, data.CLASSES_CODE, data.CHAPTER_CODE, data.PART_CODE, data.ORDERID, 'E', function (err, rows) {
                console.log(data);
                res.send(data);
            });
        } else {
            mstudy._sp_MEMBER_CLASSES_CHAPTER_PART(uid, data.CLASSES_CODE, data.CHAPTER_CODE, data.PART_CODE, data.ORDERID, 'E', function (err, rows) {
                mstudy._sp_MEMBER_CLASSES_CHAPTER_PART_VOICE(uid, classes_code, chapter_code, part_code, orderid, dataQ, function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(data);
                    res.send(data);
                });
            });
        }




    });
});


router.post("/next_reject", function(req, res) {

    var uid = req.query.uid;
    var classes_code = req.query.classes_code;
    var chapter_code = req.query.chapter_code;
    var part_code = req.query.part_code;
    var orderid = req.query.orderid;

    var dataQ = req.body;
    var dataQ_length = Object.keys(dataQ).length;

    console.log(classes_code + "///" + chapter_code + "///" + part_code + "///" + orderid);



    mstudy._sp_STUDY_QUESTION_REJECT(uid, classes_code, chapter_code, part_code, orderid, function(err, rows) {
        if(err) {
            console.log(err);
        }
        var data = rows[0][0];

        if(dataQ_length == 0) {
            mstudy._sp_MEMBER_CLASSES_CHAPTER_PART(uid, data.CLASSES_CODE, data.CHAPTER_CODE, data.PART_CODE, data.ORDERID, 'E', function (err, rows) {
                console.log(data);
                res.send(data);
            });
        } else {
            mstudy._sp_MEMBER_CLASSES_CHAPTER_PART(uid, data.CLASSES_CODE, data.CHAPTER_CODE, data.PART_CODE, data.ORDERID, 'E', function (err, rows) {
                mstudy._sp_MEMBER_CLASSES_CHAPTER_PART_VOICE(uid, classes_code, chapter_code, part_code, orderid, dataQ, function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(data);
                    res.send(data);
                });
            });
        }




    });
});


module.exports = router;