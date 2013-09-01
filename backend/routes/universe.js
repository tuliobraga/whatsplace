var mysql = require('../control/db/connection');
var universoDAO = require('../control/db/universoDAO');

exports.insert = function insertUniverse(req, res) {
    var nome = req.body.nome;
    var privado = req.body.privado;
    var administrador = req.session.usuario;
    var universo = new Universo(null, nome, privado, administrador);

    // connect to database
    var con = mysql.getConnection();
    universoDAO.insert(con, universo, function(id) {
        if (id) {
            universo.setId(id);
            res.send(200);
        } else {
            res.send(500);
        }
    });
}

exports.listUsers = function listUserUniverses(req, res) {
    var usuario = req.session.usuario;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.listUsers(con, usuario, function(universes) {
        if (universes) {
            res.send(200, universes);
        }
        else {
            res.send(500);
        }
    })
}

exports.listLocals = function listUniverseLocals(req, res) {
    var idUniverso = req.body.idUniverso;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.listLocals(con, idUniverso, function(locals) {
        if (locals) {
            res.send(200, locals);
        }
        else {
            res.send(500);
        }
    })
}

exports.removeUser = function removeUserUniverse(req, res) {
    var idUniverso = req.body.idUniverso;
    var usuario = req.session.usuario;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.removeUser(con, idUniverso, usuario, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}

exports.listConvites = function(req, res) {
    // connect to database
    var con = mysql.getConnection();
    universoDAO.listConvites(con, req.session.usuario, function(convites) {
        if (convites) {
            var convitesJSON = [];
            for (var c in convites) {
                convitesJSON.push(c.toJSON());
            }
            res.send(200, querystring.stringify(convitesJSON));
        }
        else {
            res.send(500);
        }
    });
}

exports.acceptConvite = function(req, res) {
    var idUniverso = req.body.idUniverso;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.acceptConvite(con, idUniverso, req.session.usuario, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}

exports.refuseConvite = function(req, res) {
    var idUniverso = req.body.idUniverso;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.refuseConvite(con, idUniverso, req.session.usuario, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}