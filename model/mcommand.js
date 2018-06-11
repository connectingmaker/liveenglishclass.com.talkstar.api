/**
 * Created by jccho on 2018. 4. 5..
 */
var mysql_dbc = require('../module/db_con')();

var mcommand = {
    _sp_COMMAND_LIST: function( callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_COMMAND_LIST() ";
        var params = [];
        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,_sp_MEMBER_COMMAND_LIST:function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_MEMBER_COMMAND_LIST(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

}

module.exports = mcommand;
