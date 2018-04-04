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
}

module.exports = mstudy;
