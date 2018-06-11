/**
 * Created by jccho on 2018. 4. 5..
 */
var mysql_dbc = require('../module/db_con')();

var madmin = {
    _sp_ADMIN_LOGIN: function(admin_id, admin_pw, callback) {
        var connection = mysql_dbc.init();
        var query = " call _sp_ADMIN_LOGIN(?, ?) ";
        var params = [];
        params.push(admin_id);
        params.push(admin_pw);
        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

}

module.exports = madmin;
