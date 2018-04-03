/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();


var mvoice = require("../model/mvoice");
var mecab = require('mecab-ya');


router.get("/test", function(req, res) {
    var text = '사과가 영어로 뭐야?';
    var text = '영어로 사과가 뭐야?';
    //var text = "한영사전에서 사과 찾아줘";
    text = text.replace(/ /g, '');
    //NNG+NKS - 매미가
    //NNG+JX - 매미는

    //NNG+JKB - 영어로


    //NNG+NNG+JKB

    console.log(text);

    /*
    [ '한영사전', 'NNG' ],
        [ '에서', 'JKB' ],
        [ '사과', 'NNG' ],
        [ '찾', 'VV' ],
        [ '아', 'EC' ],
        [ '줘', 'VX+EC' ]
    */
    mecab.pos(text, function (err, result) {
        console.log(result);
        res.send(result);
        /*
            [ [ '아버지', 'NNG' ],
              [ '가', 'JKS' ],
              [ '방', 'NNG' ],
              [ '에', 'JKB' ],
              [ '들어가', 'VV' ],
              [ '신다', 'EP+EC' ] ]
        */
    });


    mecab.morphs(text, function (err, result) {
        console.log(result);
    });

    mecab.nouns(text, function (err, result) {
        console.log(result);
    });


});

module.exports = router;