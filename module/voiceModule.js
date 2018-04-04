var mecab = require('mecab-ya');
var client = require('cheerio-httpcli');
var URL    = require('url');


var voiceModule = {
    searchTxt: function(searchName) {
        mecab.nouns(searchName, function (err, result) {
            var englishTxt = "";
            for(var i = 0; i<result.length; i++) {
                if(encodeURI(result[i].trim()) != encodeURI("영어") || result[i].trim() != undefined) {
                    englishTxt = result[i];
                }
            }

            console.log(englishTxt);
            return englishTxt;

        });
    }
    ,searchEnglishName: function(searchTxt) {
        var search = "http://endic.naver.com/search.nhn?sLn=kr&dicQuery="+encodeURI(searchTxt)+"&x=0&y=0&query="+encodeURI(searchTxt)+"&target=endic&ie=utf8&query_utf=&isOnlyViewEE=N";
        var param = [];

        client.fetch(search, param, function (err, $, htmlres, htmlbody) {
            if (err) {
                console.log("Error:", err);
                return;
            }

            var english = $(".word_num2 .fnt_e30").first().text();
            var english_file = $(".word_num2 .list_e2 .first .btn_side_play").attr("playlist");

            english = english.trim();


            var json = {
                english : english
                ,englishfile : english_file
            }

            console.log(json);

            return json;
        });
    }
}

module.exports = voiceModule;
