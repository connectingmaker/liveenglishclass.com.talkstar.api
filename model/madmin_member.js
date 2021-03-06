/**
 * Created by jccho on 2018. 4. 5..
 */
var mysql_dbc = require('../module/db_con')();

var madmin_member = {
    _sp_ADMIN_MEMBER_LIST: function(page, search_type, search_name, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_ADMIN_MEMBER_LIST(?, ?, ?) ";
        var params = [];
        params.push(page);
        params.push(search_type);
        params.push(search_name);
        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,adminMemberCount: function(search_type, search_name, callback) {
        var sql = "";
        sql = " SELECT COUNT(*) TOTAL FROM MEMBER ";

        if(search_name != "") {
            sql += " WHERE "+search_type+" LIKE '%"+search_name+"%' ";
        }

        var connection = mysql_dbc.init();
        var query = sql;
        var params = [];
        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

}

module.exports = madmin_member;
