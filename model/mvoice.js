/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var mysql_dbc = require('../module/db_con')();

var mstudy = {
    _sp_COMMAND_SEARCH: function(uid, searchName, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_COMMAND_SEARCH(?, ?) ";
        var params = [];
        params.push(uid);
        params.push(searchName);

        console.log(params);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MEMBER_COMMAND_SAVE: function(uid, action_code, command, command_return, file_url, tts, classes_code, chapter_code, chapter_name, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MEMBER_COMMAND_SAVE(?, ?, ?, ?, ?, ?, ?, ?, ?) ";
        var params = [];
        params.push(uid);
        params.push(action_code);
        params.push(command);
        params.push(command_return);
        params.push(file_url);
        params.push(tts);
        params.push(classes_code);
        params.push(chapter_code);
        params.push(chapter_name);

        console.log(params);


        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

}

module.exports = mstudy;
