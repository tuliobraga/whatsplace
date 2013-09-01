exports.getConnection = function() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host:     "localhost",
        user:     "root",
        password: "123456",
        database: "whatsplace"
    });
    connection.connect();
    return connection;
}

exports.endConnection = function(connection) {
    connection.end();
}