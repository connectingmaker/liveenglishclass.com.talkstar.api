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


/********* 이용약관 *************************/
router.get("/agree", function(req, res) {
    res.render("member/agree");
});


/******** 개인정보 취급방침 ********************/
router.get("/privacy", function(req, res) {
    res.render("member/privacy");
});

module.exports = router;