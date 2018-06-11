/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var mysql_dbc = require('../module/db_con')();

var mstudy = {
    _sp_STUDY_LIST: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_STUDY_LIST(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

    ,_sp_STUDY_CHAPTER_LIST: function(uid, classess_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_STUDY_CHAPTER_LIST(?, ?) ";
        var params = [];
        params.push(uid);
        params.push(classess_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

    ,_sp_STUDY_START: function(uid, classes_code, chapter_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_STUDY_START(?, ?, ?) ";
        var params = [];
        params.push(uid);
        params.push(classes_code);
        params.push(chapter_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_STUDY_QUESTION: function(uid, classes_code, chapter_code, part_code, orderid, callback)
    {
        var connection = mysql_dbc.init();
        var query = " call _sp_STUDY_QUESTION(?, ?, ?, ?, ?) ";
        var params = [];
        params.push(uid);
        params.push(classes_code);
        params.push(chapter_code);
        params.push(part_code);
        params.push(orderid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_STUDY_QUESTION_REJECT: function(uid, classes_code, chapter_code, part_code, orderid, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_STUDY_QUESTION_REJECT(?, ?, ?, ?, ?) ";
        var params = [];
        params.push(uid);
        params.push(classes_code);
        params.push(chapter_code);
        params.push(part_code);
        params.push(orderid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MEMBER_CLASSES_CHAPTER_PART: function(uid, classes_code, chapter_code, part_code, orderid, endtype, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MEMBER_CLASSES_CHAPTER_PART(?, ?, ?, ?, ?, ?) ";
        var params = [];
        params.push(uid);
        params.push(classes_code);
        params.push(chapter_code);
        params.push(part_code);
        params.push(orderid);
        params.push(endtype);

        console.log(params);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

    ,_sp_COMMAND_RANDOM: function(callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_COMMAND_RANDOM() ";
        var params = [];

        console.log(params);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MEMBER_CLASSES_CHAPTER_PART_VOICE: function(uid, classes_code, chapter_code, part_code, orderid, dataQ, callback) {
        // var connection = mysql_dbc.init();
        //
        //
        // console.log("OK");
        //
        // if(returnCheck == true) {
        //     var query = " call _sp_MEMBER_CLASSES_CHAPTER_PART_VOICE(?, ?, ?, ?, ?, ?, ?, ?) ";
        //     var params = [];
        //     params.push(uid);
        //     params.push(classes_code);
        //     params.push(chapter_code);
        //     params.push(part_code);
        //     params.push(orderid);
        //     params.push(question);
        //     params.push(answer);
        //     params.push(ox);
        //
        //     var data = connection.query(query, params, callback);
        //     connection.end();
        //     return data;
        // } else {
        //     var query = " call _sp_MEMBER_CLASSES_CHAPTER_PART_VOICE(?, ?, ?, ?, ?, ?, ?, ?) ";
        //     var params = [];
        //     params.push(uid);
        //     params.push(classes_code);
        //     params.push(chapter_code);
        //     params.push(part_code);
        //     params.push(orderid);
        //     params.push(question);
        //     params.push(answer);
        //     params.push(ox);
        //
        //     var data = connection.query(query, params);
        // }

        var connection = mysql_dbc.init();
        var query = " call _sp_MEMBER_CLASSES_CHAPTER_PART_VOICE(?, ?, ?, ?, ?, ?, ?, ?) ";

        var params = [];

        var dataQ_length = Object.keys(dataQ).length;
        var checkInt = 0;


        for(key in dataQ) {

            var temp = dataQ[key].split('///');

            //console.log(dataQ_length +"///" + checkInt);


            params = [];
            params.push(uid);
            params.push(classes_code);
            params.push(chapter_code);
            params.push(part_code);
            params.push(orderid);
            params.push(temp[0]);
            params.push(temp[1]);


            console.log(temp[0]+"///"+temp[1]);

            var OX = "";
            if(temp[0] == temp[1]) {
                OX = "1";
            } else {
                OX = "2";
            }

            params.push(OX);

            console.log("데이터==============");
            console.log(params);
            //console.log(params);
            if(dataQ_length-1 == checkInt) {
                var data = connection.query(query, params, callback);
                connection.end();
                return data;
            } else {
                var data = connection.query(query, params);
            }

            checkInt++;

        }


    }
}

module.exports = mstudy;
