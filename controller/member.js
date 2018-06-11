/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();


var mmember = require("../model/mmember");


/******* 로그인 ********************************/
router.post("/loginProcess", function(req, res) {
    var useremail = req.body.useremail;
    var userpwd = req.body.userpwd;
    var token =req.body.token;

    mmember._sp_LOGIN(useremail, userpwd, token, function(err, row) {
        try {
            var data = row[0][0];
            var json = data;
            console.log(json);

            res.send(json);

        } catch (e) {
            var json = {
                "ERR_CODE" : "999"
                ,"ERR_MSG" : "DATA_ERR"
            }
            res.send(json);
        }
    });
});

/*************** 의견보내기 ******************/
router.post("/qnaProcess",function(req,res) {
    var uid = req.body.uid;
    var question = req.body.question;

    mmember._sp_MEMBER_QNA_SAVE(uid,question, function(err, rows) {
        console.log(err);
        try {
            var data = rows[0][0];
            var json = data;
            console.log(json);

            res.send(json);

        } catch (e) {
            var json = {
                "ERR_CODE" : "999"
                ,"ERR_MSG" : "DATA_ERR"
            }
            res.send(json);
        }
    });
});

/******** 회원가입 *********************************/
router.post("/userJoinSuccess", function(req, res) {
    var email = req.body.email;
    var username = req.body.username;
    var phone_number = req.body.phone_number;
    var pwd = req.body.pwd;
    var Token = req.body.Token;
    var DeviceName = req.body.DeviceName;
    var DeviceModel = req.body.DeviceModel;
    var OSVersion = req.body.OSVersion;


    mmember._sp_MEMBER_SAVE(email, username, phone_number, pwd, function(err, rows) {
        try {
            var data = rows[0][0];


            var UID = data.UID;
            var ERR_CODE = data.ERR_CODE;
            var ERR_MSG = data.ERR_MSG;
            console.log(data);

            if(ERR_CODE == "000") {
                console.log("OK");
                mmember._sp_MEMBER_DETAIL_SAVE(UID, Token, DeviceName, DeviceModel, OSVersion, function (err, rows2) {
                    var json = {
                        "ERR_CODE" : ERR_CODE
                        ,"ERR_MSG" : ERR_MSG
                        ,"UID" : UID
                    }

                    res.send(json);
                });
            } else {
                console.log("OK2");
                console.log(ERR_CODE);
                var json = {
                    "ERR_CODE" : ERR_CODE
                    ,"ERR_MSG" : ERR_MSG
                }
                res.send(json);
            }

        } catch (e) {
            var json = {
                "ERR_CODE" : "999"
                ,"ERR_MSG" : "DATA_ERR"
            }
            res.send(json);

        }
    });

});

/********* 공지사항 *************************/
router.get("/noticeList", function(req, res) {
    // var notice_title = req.query.notice_title;
    // var notice_content = req.query.notice_content;



    mmember._sp_NOTICE_LIST(function(err, rows) {
        var data = rows[0];

        var json = {
            err_code : "000"
            ,data : data
        }

        res.send(json);
    });

});

/********* 공지사항 내용*************************/
router.get("/noticeContent", function(req, res) {
    var seq = req.query.seq;
    // var notice_content = req.query.notice_content;



    mmember.sp_NOTICE_CONTENT(seq,function(err, rows) {
        var data = rows[0];

        var json = {
            err_code : "000"
            ,data : data
        }

        console.log(json);

        //res.render('admin/member/list', { layout: 'layout/single_layout', "layout extractScripts": true });
        res.render("member/noticeContent", { layout: 'layout/single_layout', "layout extractScripts": true ,json : json });

    });

});




/********* 이용약관 *************************/
router.get("/agree", function(req, res) {
    res.render("member/agree",  { layout: 'layout/single_layout', "layout extractScripts": true });
});


/******** 개인정보 취급방침 ********************/
router.get("/privacy", function(req, res) {
    res.render("member/privacy",  { layout: 'layout/single_layout', "layout extractScripts": true });
});

router.get("/mypage", function(req, res) {
    var uid = req.query.uid;
    console.log(uid);
    mmember._sp_MYPAGE(uid, function(err, rows) {
       if(err) {
           console.log(err);
       }

       var data = rows[0][0];
       console.log(data);

       res.send(data);
    });
});

module.exports = router;