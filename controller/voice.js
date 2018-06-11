/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();


var mvoice = require("../model/mvoice");



var mecab = require('mecab-ya');
var client = require('cheerio-httpcli');
var URL    = require('url');

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
            console.log(data);
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

                mecab.pos(searchName, function (err, result) {
                    console.log(result.length);
                    if(result.length > 1) {
                        var search = "http://endic.naver.com/translateAPI.nhn?sLn=kr&_callback=&m=getTranslate&query="+encodeURI(searchName)+"&sl=ko&tl=en";
                        var param = [];

                        client.fetch(search, param, function (err, $, htmlres, htmlbody) {
                            if (err) {
                                console.log("Error:", err);
                                return;
                            }



                            var dataResult = JSON.parse(htmlbody);


                            mvoice._sp_MEMBER_COMMAND_SAVE(uid, data.ACTION_CODE, searchNameTemp, dataResult.transResult.resultData, "", "Y", "", "", "", function(err,rows) {
                                if(err)
                                {
                                    console.log(err);
                                }
                                var voiceData = rows[0][0];
                                res.send(voiceData);
                            });


                        });
                    } else {
                        var search = "http://endic.naver.com/search.nhn?sLn=kr&dicQuery="+encodeURI(searchName)+"&x=0&y=0&query="+encodeURI(searchName)+"&target=endic&ie=utf8&query_utf=&isOnlyViewEE=N";
                        var param = [];

                        client.fetch(search, param, function (err, $, htmlres, htmlbody) {
                            if (err) {
                                console.log("Error:", err);
                                return;
                            }


                            var english = $(".word_num2 .fnt_e30").first().text();
                            var english_file = $(".word_num2 .list_e2 .first .btn_side_play").attr("playlist");

                            english = english.trim();



                            mvoice._sp_MEMBER_COMMAND_SAVE(uid, data.ACTION_CODE, searchNameTemp, english, english_file, "N", "", "", "", function(err,rows) {
                                console.log("OK");
                                if(err)
                                {
                                    console.log(err);
                                }
                                var voiceData = rows[0][0];
                                res.send(voiceData);
                            });




                        });
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
    mvoice._sp_COMMAND_SEARCH("1111", searchName, function(err, rows) {

        var data = rows[0][0];

        var command_name = data.COMMAND_NAME;
        command_name = command_name.replace("[WORD]", "");
        command_name = command_name.replace("가 ", "는 ");
        searchName = searchName.replace(command_name, "");
        console.log(command_name);
        console.log(searchName);


        mecab.pos(searchName, function (err, result) {
            if(result.length > 1) {
                var search = "http://endic.naver.com/translateAPI.nhn?sLn=kr&_callback=&m=getTranslate&query="+encodeURI(searchName)+"&sl=ko&tl=en";
                var param = [];

                client.fetch(search, param, function (err, $, htmlres, htmlbody) {
                    if (err) {
                        console.log("Error:", err);
                        return;
                    }



                    var data = JSON.parse(htmlbody);

                    console.log(data.transResult.resultData);

                    data.ENGLISH = data.transResult.resultData;
                    data.ENGLISH_FILE = "TTS";

                    res.send(data);

                });
            } else {
                var search = "http://endic.naver.com/search.nhn?sLn=kr&dicQuery="+encodeURI(searchName)+"&x=0&y=0&query="+encodeURI(searchName)+"&target=endic&ie=utf8&query_utf=&isOnlyViewEE=N";
                var param = [];

                client.fetch(search, param, function (err, $, htmlres, htmlbody) {
                    if (err) {
                        console.log("Error:", err);
                        return;
                    }

                    var english = $(".word_num2 .fnt_e30").first().text();
                    var english_file = $(".word_num2 .list_e2 .first .btn_side_play").attr("playlist");

                    english = english.trim();



                    data.ENGLISH = english;
                    data.ENGLISH_FILE = english_file;


                    res.send(data);

                });
            }
            //console.log(result);
        });

    });
});


module.exports = router;