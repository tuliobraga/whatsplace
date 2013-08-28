const INSERT = 'INSERT INTO universo (nome_universo, privado_universo, administrador_universo) VALUES (?, ?, ?)';
const INSERT_USUARIO = 'INSERT INTO usuario_participa_universo (id_usuario, id_universo) VALUES (?, ?)';
const REMOVE_USUARIO = 'DELETE FROM usuario_participa_universo WHERE id_usuario = ? AND id_universo = ?';
const LIST = 'SELECT universo.* FROM universo WHERE universo.id_usuario = ?';
const CONVITE_LIST_USERS = 'SELECT convite.* FROM convite ' +
    'INNER JOIN universo ON universo.id_universo = convite.id_universo ' +
    'WHERE convite.convidado_convite = ? AND convite.pendente_convite = 0';
const CONVITE_INSERT = 'INSERT INTO convite (id_universo, id_convite, texto_convite, pendente_convite) ' +
    'VALUES (?, ?, ?, ?)';
const CONVITE_UPDATE = 'UPDATE convite SET pendente_convite = ? WHERE id_universo = ? AND id_usuario = ?';

var usuarioDAO = require('./usuarioDAO');

function extrairUniverso(obj) {
    return new Universo(
        obj.id_universo,
        obj.nome_universo,
        obj.privado_universo,
        usuarioDAO.extrairUsuario(obj)
    )
}

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

exports.list = function listUniverso(con, usuario, callback) {
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

exports.removeUser = function(con, idUniverso, usuario, callback) {
    con.query(REMOVE_USUARIO, [usuario.getId(), idUniverso], callback);
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