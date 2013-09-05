exports.getConnection = function() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host:     "localhost",
        user:     "root",
        password: "",
        database: "whatsplace"
    });
    connection.connect();
    return connection;
}

exports.endConnection = function(connection) {
    connection.end();
}