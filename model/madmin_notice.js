/**
 * Created by jccho on 2018. 4. 5..
 */
var mysql_dbc = require('../module/db_con')();

var madmin_member = {
    _sp_ADMIN_NOTICE_LIST: function(page, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_ADMIN_NOTICE_LIST(?) ";
        var params = [];
        params.push(page);
        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,adminNoticeCount: function(callback) {
        var sql = "";
        sql = " SELECT COUNT(*) TOTAL FROM MEMBER ";


        var connection = mysql_dbc.init();
        var query = sql;
        var params = [];
        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

}

module.exports = madmin_member;
