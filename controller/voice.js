/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();


var mvoice = require("../model/mvoice");



var mecab = require('mecab-ya');
var client = require('cheerio-httpcli');
var URL    = require('url');

var client_id = 'oNRTEXF0Opip9rtKLU4a';
var client_secret = '1q4cW47dBX';



router.get("/search", function(req, res) {
    var uid = req.query.uid;
    var searchName = req.query.searchName;
    var searchNameTemp = searchName;





    mvoice._sp_COMMAND_SEARCH(uid, searchName, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0][0];




        if(data == undefined) {
            var json = {
                SEQ : 0
                ,ACTION_CODE : "NOT"
                ,COMMAND_VOICE : searchName
                ,COMMAND_RETURN : "해당 명령어가 존재하지 않습니다"
                ,FILE_URL : ""
                ,YYS_YN : "Y"
            };

            res.send(json);
        } else {
            var command_name = data.COMMAND_NAME;
            //var searchNameTemp = searchName;
            //console.log(command_name);
            // console.log("command_name="+command_name);
            // command_name = command_name.replace("[WORD]는", "");
            // command_name = command_name.replace("[WORD]가", "");
            // console.log("command_name="+command_name);
            // searchName = searchName.replace(command_name, "");
            // console.log("searchName="+searchName);

            if(searchName.indexOf("가 영어로") > -1) {
                searchName = searchName.replace("가 영어로", "");
            }


            var command_name_Temp  = command_name.split(' ');
            for(var i = 0; i<command_name_Temp.length; i++) {
                searchName = searchName.replace(command_name_Temp[i], "");
            }




            if(data.ACTION_CODE == "A003"){
                var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
                var request = require('request');
                var options = {
                    url: api_url,
                    form: {'source':'ko', 'target':'en', 'text':searchName},
                    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
                };
                request.post(options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var json = JSON.parse(body);
                        var english_string = json.message.result.translatedText;

                        mvoice._sp_MEMBER_COMMAND_SAVE(uid, data.ACTION_CODE, searchNameTemp, english_string, "", "Y", "", "", "", function(err,rows) {
                            if(err)
                            {
                                console.log(err);
                            }
                            var voiceData = rows[0][0];
                            res.send(voiceData);
                        });


                    } else {
                        res.status(response.statusCode).end();
                        console.log('error = ' + response.statusCode);
                    }
                });
            } else {


                data.ENGLISH = "";
                data.ENGLISH_FILE = "";

                if(data.RETURN == "") {
                    data.RETURN = "진행가능한 수업이 없습니다";
                }

                mvoice._sp_MEMBER_COMMAND_SAVE(uid, data.ACTION_CODE, searchNameTemp, data.RETURN_MSG, "", "Y", data.CLASSES_CODE, data.CHAPTER_CODE, data.CHAPTER_NAME, function(err,rows) {
                    if(err)
                    {
                        console.log(err);
                    }
                    var voiceData = rows[0][0];
                    res.send(voiceData);
                });

                res.send(data);
            }

        }




    });
});




router.get("/test", function(req, res) {
    var text = '커피';

    //나는 먹습니다가

    var stringTemp = "";
    //text = text.replace(/ /g, '');

    var returnData = "[WORD]가 영어로 뭐야";
    returnData = returnData.replace("[WORD]", "");


    text = text.replace(returnData, "");






    var search = "http://endic.naver.com/translateAPI.nhn?sLn=kr&_callback=&m=getTranslate&query="+encodeURI(text)+"&sl=ko&tl=en";
    var param = [];

    client.fetch(search, param, function (err, $, htmlres, htmlbody) {
        if (err) {
            console.log("Error:", err);
            return;
        }



        var data = JSON.parse(htmlbody);

        console.log(data.transResult.resultData);

        res.send("1111");

    });




    mecab.pos(text, function (err, result) {
        console.log(result);
    });


});

router.get("/test2", function(req, res) {
    var searchName = "사과는 영어로 뭐야";
    var searchNameTemp = searchName;
    var uid = "1111";
    mvoice._sp_COMMAND_SEARCH("1111", searchName, function(err, rows) {

        var data = rows[0][0];

        var command_name = data.COMMAND_NAME;
        command_name = command_name.replace("[WORD]", "");
        command_name = command_name.replace("가 ", "는 ");
        command_name = command_name.replace("은 ", "는 ");
        searchName = searchName.replace(command_name, "");
        console.log(command_name);
        console.log(searchName);


        mecab.pos(searchName, function (err, result) {
            var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
            var request = require('request');
            var options = {
                url: api_url,
                form: {'source':'ko', 'target':'en', 'text':searchName},
                headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
            };
            request.post(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                    var json = JSON.parse(body);
                    var english_string = json.message.result.translatedText;

                    mvoice._sp_MEMBER_COMMAND_SAVE(uid, "003", searchNameTemp, english_string, "", "Y", "", "", "", function(err,rows) {
                        if(err)
                        {
                            console.log(err);
                        }
                        var voiceData = rows[0][0];
                        res.send(voiceData);
                    });


                } else {
                    res.status(response.statusCode).end();
                    console.log('error = ' + response.statusCode);
                }
            });
            //console.log(result);
        });

    });
});


module.exports = router;