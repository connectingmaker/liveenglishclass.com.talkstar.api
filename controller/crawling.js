/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var client = require('cheerio-httpcli');
var URL    = require('url');
var express = require('express');
var router = express.Router();




router.get("/searchEndic", function(req, res) {
    var searchQ = req.query.searchQ;
    var search = "http://endic.naver.com/search.nhn?sLn=kr&dicQuery="+encodeURI(searchQ)+"&x=0&y=0&query="+encodeURI(searchQ)+"&target=endic&ie=utf8&query_utf=&isOnlyViewEE=N";
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

        res.send(json);
    });

});

module.exports = router;