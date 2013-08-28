const GET = 'SELECT usuario.* FROM usuario WHERE usuario.id = ?';
const GET_PASS = 'SELECT usuario.* FROM usuario WHERE usuario.email = ? AND usuario.senha = PASSWORD(?)';
const GET_CODE = 'SELECT usuario.* FROM usuario WHERE usuario.email = ? AND usuario.codigo_confirmacao = ?';
const INSERT = 'INSERT INTO usuario (nome, email, senha, codigo_confirmacao) VALUES (?, ?, PASSWORD(?), ?)';
const UPDATE = 'UPDATE usuario SET nome = ?, email = ?, codigo_confirmacao = ?, localAtual = ? WHERE id = ?';
const UPDATE_CONF_COD = 'UPDATE usuario SET codigo_confirmacao = ? WHERE email = ?';

function extrairUsuario(obj) {
    return new Usuario(
        obj.id,
        obj.nome,
        obj.senha,
        obj.avatar,
        obj.codigoConfirmacao,
        obj.localAtual);
}

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
    con.query(GET_PASS, [email, password],
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
}

exports.confirmEmail = function confirmEmailUser(con, email, code, callback) {
    con.query(GET_CODE, [email, code],
        function resultadoGetCode(err, result) {
            if (!err) {
                if (result.length > 0) {
                    var usuario = extrairUsuario(result[0]);
                    usuario.setCodigoConfirmacao(null);
                    this.update(con, usuario, function(u) {
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
    con.query(UPDATE, [usuario.getNome(), usuario.getEmail(), usuario.getCodigoConfirmacao(),
                       usuario.getLocalAtual(), usuario.getId()],
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

exports.updateConfirmationCode = function updateConfirmationCodeUser(con, email, code, callback) {
    // tenta alterar usuário
    con.query(UPDATE_CONF_COD, [code, email],
        function resultadoUpdateConfirmationCode(err, result) {
            callback(err);
        }
    );
}