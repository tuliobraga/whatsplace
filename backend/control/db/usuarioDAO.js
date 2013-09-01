const GET = 'SELECT usuario.*, universo.*, local.* ' +
    'FROM usuario ' +
    'LEFT JOIN rastreamento ON rastreamento.id_usuario = usuario.id_usuario ' +
    'LEFT JOIN local ON local.id_local = rastreamento.id_local ' +
    'LEFT JOIN universo ON universo.id_universo = local.universo_local ' +
    'WHERE rastreamento.data_saida IS NULL ' +
    'AND usuario.id_usuario = ?';
const GET_PASS = 'SELECT usuario.*, universo.*, local.* ' +
    'FROM usuario ' +
    'LEFT JOIN rastreamento ON rastreamento.id_usuario = usuario.id_usuario ' +
    'LEFT JOIN local ON local.id_local = rastreamento.id_local ' +
    'LEFT JOIN universo ON universo.id_universo = local.universo_local ' +
    'WHERE rastreamento.data_saida IS NULL ' +
    'AND usuario.email_usuario = ? ' +
    'AND usuario.senha_usuario = PASSWORD(?)';
const GET_CODE = 'SELECT usuario.* ' +
    'FROM usuario ' +
    'WHERE usuario.email_usuario = ? ' +
    'AND usuario.codigo_confirmacao_usuario = ?';
const INSERT = 'INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, codigo_confirmacao_usuario) ' +
    'VALUES (?, ?, PASSWORD(?), ?)';
const UPDATE = 'UPDATE usuario SET nome_usuario = ?, email_usuario = ?, ' +
    'codigo_confirmacao_usuario = ? ' +
    'WHERE id_usuario = ?';
const UPDATE_CONF_COD = 'UPDATE usuario SET codigo_confirmacao_usuario = ? ' +
    'WHERE email_usuario = ?';
const UPDATE_LOCAL = 'UPDATE rastreamento SET data_saida = CURRENT_TIMESTAMP() WHERE id_usuario = ? AND data_saida IS NULL; ' +
    'INSERT INTO rastreamento (id_usuario, id_local, data_entrada) VALUES (?, ?, CURRENT_TIMESTAMP())';

var usuarioClass = require('../../models/usuario');
var universoDAO = require('./universoDAO');

function extrairUsuarioCompleto(obj) {
    var universo = universoDAO.extrairUniverso(result[0]);
    var local = universoDAO.extrairLocal(result[0]);
    return new usuarioClass.Usuario(
        obj.id_usuario,
        obj.nome_usuario,
        obj.senha_usuario,
        obj.avatar_usuario,
        obj.codigoConfirmacao_usuario,
        universo,
        local);
}

exports.extrairUsuario = function extrairUsuario(obj) {
    return new usuarioClass.Usuario(
        obj.id_usuario,
        obj.nome_usuario,
        obj.senha_usuario,
        obj.avatar_usuario,
        obj.codigoConfirmacao_usuario,
        null,
        null);
}

exports.get = function getUser(con, id, callback) {
    con.query(GET, [id],
        function resultadoGet(err, result) {
            var usuario = null;
            if (!err) {
                if (result.length > 0) {
                    usuario = extrairUsuarioCompleto(result[0]);
                }
            }
            callback(usuario);
        }
    );
}

exports.getWithPass = function getUser(con, email, password, callback) {
    con.query(GET_PASS, [email, password],
        function resultadoGetPass(err, result) {
            var usuario = null;
            if (!err) {
                if (result.length > 0) {
                    usuario = extrairUsuarioCompleto(result[0]);
                }
            }
            callback(usuario);
        }
    );
}

exports.confirmEmail = function confirmEmailUser(con, user, code, callback) {
    con.query(GET_CODE, [user.getEmail(), code],
        function resultadoGetCode(err, result) {
            if (!err) {
                if (result.length > 0) {
                    user.setCodigoConfirmacao(null);
                    this.update(con, user, function(u) {
                        callback(u);
                    });
                }
                else {
                    callback(null);
                }
            }
            else {
                callback(null);
            }
        }
    );
}

exports.insert = function insertUser(con, usuario, callback) {
    // tenta inserir usuário
    con.query(INSERT, [usuario.getNome(), usuario.getEmail(), usuario.getSenha(), usuario.getCodigoConfirmacao()],
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

exports.update = function updateUser(con, usuario, callback) {
    // tenta alterar usuário
    con.query(UPDATE, [usuario.getNome(), usuario.getEmail(), usuario.getCodigoConfirmacao(), usuario.getId()],
        function resultadoUpdate(err, result) {
            if (!err) {
                callback(usuario);
            }
            else {
                callback(null);
            }
        }
    );
}

exports.updateConfirmationCode = function updateConfirmationCodeUser(con, user, code, callback) {
    user.setCodigoConfirmacao(code);
    // tenta alterar usuário
    con.query(UPDATE_CONF_COD, [user.getCodigoConfirmacao(), user.getEmail()],
        function resultadoUpdateConfirmationCode(err, result) {
            if (!err) {
                callback(user);
            }
            else {
                callback(null);
            }
        }
    );
}

exports.updateLocal = function updateLocalUser(con, user, idLocal, callback) {
    con.query(UPDATE_LOCAL, [user.getId(), user.getId(), idLocal], function(err, result) {
        if (!err) {
            callback(user);
        }
        else {
            callback(null);
        }
    });
}