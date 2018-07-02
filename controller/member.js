/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();


var mmember = require("../model/mmember");
var mcommand = require("../model/mcommand");


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
/********* 명령어 *************************/
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
/********* 명령어 내용*************************/
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


/********* 이용약관 *************************/
router.get("/agree", function(req, res) {
    res.render("member/agree",  { layout: 'layout/single_layout', "layout extractScripts": true });
});


/******** 개인정보 취급방침 ********************/
router.get("/privacy", function(req, res) {
    res.render("member/privacy",  { layout: 'layout/single_layout', "layout extractScripts": true });
});

/*************** 마이페이지 ***********************/
router.get("/mypage", function(req, res) {
    var uid = req.query.uid;

     mmember._sp_MYPAGE(uid, function(err, rows) {
         if(err) {
             console.log(err);
         }

         var data = rows[0][0];
         console.log(data);
         res.send(data);
     });
});

router.get("/studyfinishresult", function(req, res) {
    var uid = req.query.uid;
    var classesCode = req.query.classesCode;
    var chapterCode = req.query.chapterCode;

    mmember._sp_MYPAGE_RESULT_NOW(classesCode, chapterCode,function(err, rows) {
        var star_count_now = rows[0][0].STAR_COUNT_NOW;

        console.log(star_count_now);


        mmember._sp_MYPAGE_RESULT_ALL(uid, function(err, rows) {
            if(err) {
                console.log(err);
            }
            var star_count = rows[0][0].STAR_COUNT;
            star_count = Math.ceil(star_count);
            // var star_all = rows[0].STAR_ALL;
            // star_all = Math.ceil(star_all);
            var per = Math.round(rows[0][0].PER,0);

            mmember._sp_MYPAGE_RESULT_YESTERDAY2(uid, function(err, rows) {
                if(err) {
                    console.log(err);
                }
                var star_count_yesterday2 = rows[0][0].STAR_COUNT_YESTERDAY2;
                star_count_yesterday2 = Math.ceil(star_count_yesterday2);

                mmember._sp_MYPAGE_RESULT_YESTERDAY(uid, function(err, rows) {
                    var star_count_yesterday = rows[0][0].STAR_COUNT_YESTERDAY;
                    star_count_yesterday = Math.ceil(star_count_yesterday);

                    //console.log(star_count_yesterday);

                    mmember._sp_MYPAGE_RESULT_TODAY(uid, function(err, rows) {
                        var star_count_today = rows[0][0].STAR_COUNT_TODAY;
                        var jsonData={
                            STAR_COUNT : star_count
                            ,PER :per
                            ,STAR_COUNT_YESTERDAY :star_count_yesterday
                            ,STAR_COUNT_YESTERDAY2 :star_count_yesterday2
                            ,STAR_COUNT_TODAY : Math.round(star_count_today)
                            ,STAR_COUNT_NOW : star_count_now
                        };
                        res.send(jsonData);
                    });
                });
            });
        });
    });


});

module.exports = router;