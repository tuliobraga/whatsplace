const INSERT                = 'INSERT INTO universo (nome_universo, privado_universo, administrador_universo) VALUES (?, ?, ?)';
const DELETE                = 'DELETE FROM universo WHERE id_universo = ?';
const INSERT_LOCAL          = 'INSERT INTO local (nome_local, latitude_local, longitude_local, universo_local) VALUES (?, ?, ?, ?)';
const DELETE_LOCAL          = 'DELETE FROM local WHERE id_local = ?';
const INSERT_USUARIO        = 'INSERT INTO usuario_participa_universo (id_usuario, id_universo) VALUES (?, ?)';
const REMOVE_USUARIO        = 'DELETE FROM usuario_participa_universo WHERE id_usuario = ? AND id_universo = ?';
const GET_LOCAL             = 'SELECT local.* FROM local WHERE local.id_local = ?';
const DEIXAR_LOCAL          = 'UPDATE rastreamento SET data_saida = CURRENT_TIMESTAMP() WHERE data_saida IS NULL AND id_usuario = ? AND id_local = ?';
const SEARCH                = 'SELECT universo.* FROM universo WHERE universo.privado_universo = 0 AND universo.nome_universo LIKE "%?%"';
const LIST                  = 'SELECT universo.* FROM universo WHERE universo.id_usuario = ?';
const LIST_LOCALS           = 'SELECT local.* FROM local WHERE local.universo_local = ?';
const LIST_USERS            = 'SELECT usuario.* FROM usuario ' +
                            'INNER JOIN rastreamento ON rastreamento.id_usuario = usuario.id_usuario ' +
                            'INNER JOIN local ON local.id_local = rastreamento.id_local ' +
                            'WHERE rastreamento.data_saida IS NULL ' +
                            'AND local.universo_local = ?';
const LIST_USERS_REGISTERED = 'SELECT usuario.* FROM usuario ' +
                            'INNER JOIN usuario_participa_universo ON usuario_participa_universo.id_usuario = usuario.id_usuario ' +
                            'WHERE usuario_participa_universo.id_universo = ?';
const SEARCH_USERS          = 'SELECT usuario.*, local.* FROM usuario ' +
                            'INNER JOIN rastreamento ON rastreamento.id_usuario = usuario.id_usuario ' +
                            'INNER JOIN local ON local.id_local = rastreamento.id_local ' +
                            'WHERE rastreamento.data_saida IS NULL ' +
                            'AND local.universo_local = ? ' +
                            'AND usuario.nome LIKE "%?%" ' +
                            'ORDER BY local.nome_local ASC';
const LIST_USERS_LOCAL      = 'SELECT usuario.* FROM usuario ' +
                            'INNER JOIN rastreamento ON rastreamento.id_usuario = usuario.id_usuario ' +
                            'INNER JOIN usuario_participa_universo ON usuario_participa_universo.id_universo = rastreamento.id_universo ' +
                            'WHERE rastreamento.data_saida IS NULL ' +
                            'AND rastreamento.id_local = ?';
const CONVITE_LIST_USERS    = 'SELECT convite.* FROM convite ' +
                            'INNER JOIN universo ON universo.id_universo = convite.id_universo ' +
                            'WHERE convite.convidado_convite = ? ' +
                            'AND convite.pendente_convite = 0';
const CONVITE_INSERT        = 'INSERT INTO convite (id_universo, id_convite, texto_convite, pendente_convite) ' +
                            'VALUES (?, ?, ?, 1)';
const CONVITE_UPDATE        = 'UPDATE convite SET pendente_convite = ? WHERE id_universo = ? AND id_usuario = ?';
const CHECK_ADMIN           = 'SELECT * FROM usuario_gerencia_universo WHERE id_usuario = ? AND id_universo = ?';

var usuarioDAO = require('./usuarioDAO');
var universoClass = require('../../models/universo');
var localClass = require('../../models/local');

function extrairUniverso(obj) {
    return new universoClass.Universo(
        obj.id_universo,
        obj.nome_universo,
        obj.privado_universo,
        usuarioDAO.extrairUsuario(obj)
    )
}
exports.extrairUniverso = extrairUniverso;

function extrairLocal(obj) {
    return new localClass.Local(
        obj.id_local,
        obj.nome_local,
        obj.latitude_local,
        obj.longitude_local
    )
}
exports.extrairLocal = extrairLocal;

function extrairConvite(obj) {
    return new Convite(
        extrairUniverso(obj),
        usuarioDAO.extrairUsuario(obj),
        obj.texto_convite,
        obj.pendente_convite
    )
}

function extrairConvite(obj, convidado) {
    return new Convite(
        extrairUniverso(obj),
        convidado,
        obj.texto_convite,
        obj.pendente_convite
    )
}

function checkAdministrator(user, idUniverse, callback) {
    con.query(CHECK_ADMIN, [user.getId(), idUniverse], function(err, result) {
        if (err || result.length === 0) {
            callback(null);
        }
        else {
            callback(true);
        }
    });
}

exports.insertLocal = function(con, user, nome, latitude, longitude, idUniverse, callback) {
    checkAdministrator(user, idUniverse, function(ok) {
        if (ok) {
            con.query(INSERT_LOCAL, [nome, latitude, longitude, idUniverse], function(err, result) {
                callback(err);
            });
        }
        else {
            callback(true);
        }
    });
}

exports.deleteLocal = function(con, user, idLocal, idUniverse, callback) {
    checkAdministrator(user, idUniverse, function(ok) {
        if (ok) {
            con.query(DELETE_LOCAL, [idLocal], function(err, result) {
                callback(err);
            });
        }
        else {
            callback(true);
        }
    });
}

exports.getLocal = function(con, idLocal, callback) {
    con.query(GET_LOCAL, [idLocal], function(err, result) {
        if (!err) {
            callback(extrairLocal(result[0]));
        }
        else {
            callback(null);
        }
    });
}

exports.searchUniverse = function searchUniverse(con, nome, callback) {
    con.query(SEARCH, [nome], function(err, result) {
        if (!err) {
            var universos = [];
            for (var u in result) {
                universos.push(extrairUniverso(u));
            }
            callback(universos);
        }
        else {
            callback(null);
        }
    });
}

exports.listUserUniverses = function listUserUniverses(con, usuario, callback) {
    con.query(LIST, [usuario.getId()], function(err, result) {
        if (!err) {
            var universos = [];
            for (var u in result) {
                universos.push(extrairUniverso(u));
            }
            callback(universos);
        }
        else {
            callback(null);
        }
    });
}

exports.listUsers = function listUsuariosUniverso(con, idUniverso, callback) {
    con.query(LIST_USERS, [idUniverso], function(err, result) {
        if (!err) {
            var usuarioDAO = require('./usuarioDAO');
            var usuarios = [];
            for (var u in result) {
                usuarios.push(usuarioDAO.extrairUsuario(u));
            }
            callback(usuarios);
        }
        else {
            callback(null);
        }
    });
}

exports.listUsersRegistered = function listUsuariosRegistradosUniverso(con, idUniverso, callback) {
    con.query(LIST_USERS_REGISTERED, [idUniverso], function(err, result) {
        if (!err) {
            var usuarioDAO = require('./usuarioDAO');
            var usuarios = [];
            for (var u in result) {
                usuarios.push(usuarioDAO.extrairUsuario(u));
            }
            callback(usuarios);
        }
        else {
            callback(null);
        }
    });
}

exports.searchUsers = function buscarUsuariosUniverso(con, idUniverso, nome, callback) {
    con.query(SEARCH_USERS, [idUniverso, nome], function(err, result) {
        if (!err) {
            var usuarioDAO = require('./usuarioDAO');
            var usuarios = [];
            for (var u in result) {
                usuarios.push(usuarioDAO.extrairUsuario(u));
            }
            callback(usuarios);
        }
        else {
            callback(null);
        }
    });
}

exports.listUsersLocal = function listUsuariosLocal(con, idLocal, callback) {
    con.query(LIST_USERS_LOCAL, [idLocal], function(err, result) {
        if (!err) {
            var usuarioDAO = require('./usuarioDAO');
            var usuarios = [];
            for (var u in result) {
                usuarios.push(usuarioDAO.extrairUsuario(u));
            }
            callback(usuarios);
        }
        else {
            callback(null);
        }
    });
}

exports.listLocals = function listLocaisUniverso(con, idUniverso, callback) {
    con.query(LIST_LOCALS, [idUniverso], function(err, result) {
        if (!err) {
            var locais = [];
            for (var l in result) {
                locais.push(extrairLocal(l));
            }
            callback(locais);
        }
        else {
            callback(null);
        }
    });
}

exports.leaveLocal = function leaveLocal(con, idLocal, usuario, callback) {
    con.query(DEIXAR_LOCAL, [usuario.getId(), idLocal], function(err, result) {
        callback(err);
    });
}

exports.insert = function insertUniverso(con, universe, callback) {
    con.query(INSERT, [universe.getNome(), universe.isPrivado(), universe.getAdministrador().getId()],
        function resultadoInsert(err, result) {
            if (!err) {
                callback(result.insertId);
            }
            else {
                callback(null);
            }
        }
    );
}

exports.delete = function deleteUniverso(con, usuario, idUniverse, callback) {
    checkAdministrator(usuario, idUniverse, function(ok) {
        if (ok) {
            con.query(DELETE, [idUniverse], function(err, result) {
                callback(err);
            });
        }
        else {
            callback(true);
        }
    });
}

exports.removeUser = function(con, idUniverso, usuario, callback) {
    con.query(REMOVE_USUARIO, [usuario.getId(), idUniverso], callback);
}

exports.insertConvite = function insertConvite(con, usuario, idConvidado, idUniverso, texto, callback) {
    checkAdministrator(usuario, idUniverso, function(ok) {
        if (ok) {
            con.query(CONVITE_INSERT, [idUniverso, idConvidado, texto], function(err, result) {
                callback(err);
            });
        }
        else {
            callback(true);
        }
    });
}

exports.listConvites = function listConvitesUniverso(con, usuario, callback) {
    con.query(CONVITE_LIST_USERS, [usuario.getId()], function(err, result) {
        if (!err) {
            var convites = [];
            for (var c in result) {
                convites.push(extrairConvite(c, usuario));
            }
            callback(convites);
        }
        else {
            callback(null);
        }
    });
}

exports.acceptConvite = function acceptConviteUniverso(con, idUniverso, usuario, callback) {
    con.query(CONVITE_UPDATE, [0, idUniverso, usuario.getId()], function(err) {
        if (!err) {
            con.query(INSERT_USUARIO, [usuario.getId(), idUniverso], callback);
        }
        else {
            callback(err);
        }
    });
}

exports.refuseConvite = function refuseConviteUniverso(con, idConvite, usuario, callback) {
    con.query(CONVITE_UPDATE, [0, idUniverso, usuario.getId()], callback);
}