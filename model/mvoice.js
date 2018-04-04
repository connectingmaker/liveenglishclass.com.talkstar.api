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

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
}

module.exports = mstudy;
