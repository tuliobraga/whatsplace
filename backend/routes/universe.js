var mysql = require('../control/db/connection');
var universoDAO = require('../control/db/universoDAO');

exports.search = function searchUniverse(req, res) {
    var nome = req.body.nome;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.searchUniverse(con, nome, function(universes) {
        if (universes) {
            res.send(200, universes);
        }
        else {
            res.send(500);
        }
    });
}

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

exports.delete = function deleteUniverse(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = req.body.idUniverse;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.delete(con, usuario, idUniverso, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}

exports.listUserUniverses = function listUserUniverses(req, res) {
    var usuario = req.session.usuario;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.listUserUniverses(con, usuario, function(universes) {
        if (universes) {
            res.send(200, universes);
        }
        else {
            res.send(500);
        }
    })
}

/**
 * List users now in a universe
 * @param req
 * @param res
 */
exports.listUsers = function listUsers(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = usuario.getUniversoAtual().getId();
    // connect to database
    var con = mysql.getConnection();
    universoDAO.listUsers(con, idUniverso, function(users) {
        if (users) {
            res.send(200, users);
        }
        else {
            res.send(500);
        }
    });
}

/**
 * Search users now in a universe, by name
 * @param req
 * @param res
 */
exports.searchUsers = function searchUsers(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = usuario.getUniversoAtual().getId();
    var nome = req.body.nome;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.searchUsers(con, idUniverso, nome, function(users) {
        if (users) {
            res.send(200, users);
        }
        else {
            res.send(500);
        }
    });
}

/**
 * List users now in a place
 * @param req
 * @param res
 */
exports.listUsersLocal = function listUsers(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = usuario.getUniversoAtual().getId();
    var idLocal = req.body.idLocal;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.listUsersLocal(con, idLocal, function(users) {
        if (users) {
            res.send(200, users);
        }
        else {
            res.send(500);
        }
    });
}

/**
 * List a universe locals
 * @param req
 * @param res
 */
exports.listLocals = function listUniverseLocals(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = usuario.getUniversoAtual().getId();
    // connect to database
    var con = mysql.getConnection();
    universoDAO.listLocals(con, idUniverso, function(locals) {
        if (locals) {
            res.send(200, locals);
        }
        else {
            res.send(500);
        }
    });
}

exports.insertLocal = function insertLocal(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = req.body.idUniverso;
    var nome = req.body.nome;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.insertLocal(con, usuario, nome, latitude, longitude, idUniverso, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}

exports.excluirLocal = function deleteLocal(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = req.body.idUniverso;
    var idLocal = req.body.idLocal;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.deleteLocal(con, usuario, idLocal, idUniverso, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}

/**
 * User leaves its actual local
 * @param req
 * @param res
 */
exports.leaveLocal = function leaveLocal(req, res) {
    var idLocal = req.body.idLocal;
    var usuario = req.session.usuario;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.leaveLocal(con, idLocal, usuario, function(err) {
        if (!err) {
            usuario.setLocalAtual(null);
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}

/**
 * User is removed from universe
 * @param req
 * @param res
 */
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

exports.insertConvite = function(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = usuario.getUniversoAtual().getId();
    var texto = req.body.texto;
    var idConvidado = req.body.idConvidado;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.insertConvite(con, usuario, idConvidado, idUniverso, texto, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    })
}

/**
 * Show user invitations for universes
 * @param req
 * @param res
 */
exports.listConvites = function(req, res) {
    var usuario = req.session.usuario;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.listConvites(con, usuario, function(convites) {
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

/**
 * User accept the invitation for a universe
 * @param req
 * @param res
 */
exports.acceptConvite = function(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = req.body.idUniverso;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.acceptConvite(con, idUniverso, usuario, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}

/**
 * User refuses the invitation for a universe
 * @param req
 * @param res
 */
exports.refuseConvite = function(req, res) {
    var usuario = req.session.usuario;
    var idUniverso = req.body.idUniverso;
    // connect to database
    var con = mysql.getConnection();
    universoDAO.refuseConvite(con, idUniverso, usuario, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}