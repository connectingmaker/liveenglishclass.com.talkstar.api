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

    console.log("OK");


    mvoice._sp_COMMAND_SEARCH(uid, searchName, function(err, rows) {
        var data = rows[0];

        if(data.length == 0) {
            res.send(data);
        } else {
            data = data[0];
            var action_code = data.ACTION_CODE;

            if(action_code == "A003") {



                mecab.nouns(searchName, function (err, result) {
                    var englishTxt = "";
                    for(var i = 0; i<result.length; i++) {
                        if(encodeURI(result[i].trim()) != encodeURI("영어") || result[i].trim() != undefined) {
                            englishTxt = result[i];
                        }
                    }
                    if(englishTxt != "") {
                        var search = "http://endic.naver.com/search.nhn?sLn=kr&dicQuery="+encodeURI(englishTxt)+"&x=0&y=0&query="+encodeURI(englishTxt)+"&target=endic&ie=utf8&query_utf=&isOnlyViewEE=N";
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

                            console.log(data);

                            res.send(data);

                        });
                    }

                });



            } else {
                console.log("OK4");
                res.send(data);
            }

        }
    });
});

/*
router.get("/test", function(req, res) {
    var text = '사과가 영어로 뭐야?';
    var text = '영어로 사과가 뭐야?';
    text = text.replace(/ /g, '');

    console.log(text);

    mecab.pos(text, function (err, result) {
        console.log(result);
        res.send(result);

    });


    mecab.morphs(text, function (err, result) {
        console.log(result);
    });

    mecab.nouns(text, function (err, result) {
        console.log(result);
    });


});
*/

module.exports = router;