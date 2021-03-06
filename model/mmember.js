/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var mysql_dbc = require('../module/db_con')();

var mmember = {
    _sp_LOGIN: function(useremail, pwd, token, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_LOGIN(?, ?, ?) ";
        var params = [];
        params.push(useremail);
        params.push(pwd);
        params.push(token);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MEMBER_SAVE: function(useremail, username, phone_number, pwd, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MEMBER_SAVE(?, ?, ?, ?) ";
        var params = [];
        params.push(useremail);
        params.push(username);
        params.push(phone_number);
        params.push(pwd);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MEMBER_DETAIL_SAVE: function(uid, token, device_name, device_model, os_version, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MEMBER_DETAIL_SAVE(?, ?, ?, ?, ?) ";
        var params = [];
        params.push(uid);
        params.push(token);
        params.push(device_name);
        params.push(device_model);
        params.push(os_version);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

    ,_sp_MEMBER_QNA_SAVE: function(uid,question, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MEMBER_QNA_SAVE(?, ?) ";
        var params = [];
        params.push(uid);
        params.push(question);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_NOTICE_LIST:function(callback){
        var connection = mysql_dbc.init();
        var query = " call _sp_NOTICE_LIST() ";
        var params = [];

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_NOTICE_CONTENT: function(seq,callback){
        var connection = mysql_dbc.init();
        var query = " call _sp_NOTICE_CONTENT(?) ";
        var params = [];
        params.push(seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MYPAGE: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MYPAGE(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MYPAGE_RESULT_ALL: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MYPAGE_RESULT_ALL(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MYPAGE_RESULT_TODAY: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MYPAGE_RESULT_TODAY(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MYPAGE_RESULT_YESTERDAY: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MYPAGE_RESULT_YESTERDAY(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MYPAGE_RESULT_YESTERDAY2: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MYPAGE_RESULT_YESTERDAY2(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MYPAGE_RESULT_NOW: function(classesCode, chapterCode, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MYPAGE_RESULT_NOW(?,?) ";
        var params = [];
        params.push(classesCode, chapterCode);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MYPAGE_STUDY_HISTORY: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MYPAGE_STUDY_HISTORY(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
}

module.exports = mmember;
