var usuarioClass = require('../../models/usuario');

const GET = 'SELECT usuario.* FROM usuario ' +
    'WHERE usuario.id_usuario = ?';
const GET_PASS = 'SELECT usuario.* FROM usuario ' +
    'WHERE usuario.email_usuario = ? AND usuario.senha_usuario = PASSWORD(?)';
const GET_CODE = 'SELECT usuario.* FROM usuario ' +
    'WHERE usuario.codigo_confirmacao_usuario = ?';
const INSERT = 'INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, codigo_confirmacao_usuario) ' +
    'VALUES (?, ?, PASSWORD(?), ?)';
const UPDATE = 'UPDATE usuario SET nome_usuario = ?, email_usuario = ?, ' +
    'codigo_confirmacao_usuario = ? ' +
    'WHERE id_usuario = ?';
const UPDATE_CONF_COD = 'UPDATE usuario SET codigo_confirmacao_usuario = ? ' +
    'WHERE email_usuario = ?';

function extrairUsuario(obj) {
    return new usuarioClass.Usuario(
        obj.id_usuario,
        obj.email_usuario,
        obj.nome_usuario,
        obj.senha_usuario,
        obj.avatar_usuario,
        obj.codigo_confirmacao_usuario,
        obj.localAtual_usuario);
}
exports.extrairUsuario = extrairUsuario;

exports.get = function getUser(con, id, callback) {
    con.query(GET, [id],
        function resultadoGet(err, result) {
            var usuario = null;
            if (!err) {
                if (result.length > 0) {
                    usuario = extrairUsuario(result[0]);
                }
            }
            callback(usuario);
        }
    );
}

exports.getWithPass = function getUser(con, email, password, callback) {
    var query = con.query(GET_PASS, [email, password],
        function resultadoGetPass(err, result) {
            var usuario = null;
            if (!err) {
                if (result.length > 0) {
                    usuario = extrairUsuario(result[0]);
                }
            }
            callback(usuario);
        }
    );
    console.log(query.sql);
}

exports.confirmEmail = function confirmEmailUser(con, code, callback) {
    var query = con.query(GET_CODE, [code],
        function resultadoGetCode(err, result) {
            if (!err) {
                if (result.length > 0) {
                    var usuario = extrairUsuario(result[0]);
                    usuario.setCodigoConfirmacao(null);
                    updateUser(con, usuario, function(u) {
                        callback(u);
                    });
                }
                else {
                    callback(null);
                }
            }
            else {
                console.log(err);
                callback(null);
            }
        }
    );
    console.log(query.sql);
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

function updateUser(con, usuario, callback) {
    // tenta alterar usuário
    var query = con.query(UPDATE, [usuario.getNome(), usuario.getEmail(), usuario.getCodigoConfirmacao(), usuario.getId()],
        function resultadoUpdate(err) {
            if (!err) {
                callback(usuario);
            }
            else {
                callback(null);
            }
        }
    );
    console.log(query.sql);
}
exports.update = updateUser;

exports.updateConfirmationCode = function updateConfirmationCodeUser(con, email, code, callback) {
    // tenta alterar usuário
    con.query(UPDATE_CONF_COD, [code, email],
        function resultadoUpdateConfirmationCode(err, result) {
            callback(err);
        }
    );
}