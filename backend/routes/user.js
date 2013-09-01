var nodemailer = require('nodemailer');
var mysql = require('../control/db/connection');
var usuarioDAO = require('../control/db/usuarioDAO');

exports.get = function(req, res) {
    var idUsuario = req.body.idUsuario;
    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.get(con, idUsuario, function(usuario) {
        if (usuario) {
            res.send(200, usuario.toJSON());
        }
        else {
            res.send(500);
        }
    })
}

exports.authenticate = function(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.getWithPass(con, email, senha, function(u) {
        if (u) {
            req.session.usuario = u;
            if (u.getCodigoConfirmacao()) {
                res.redirect('/confirmar-conta');
            }
            else {
                res.send(200, u.toJSON());
            }
        }
        else {
            res.send(500, 'E-mail ou senha inválidos');
        }
        // close db connection
        mysql.endConnection(con);
    });
}

exports.confirmEmail = function(req, res) {
    var usuario = req.session.usuario;
    var codigo = req.body.codigo;

    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.confirmEmail(con, usuario, codigo, function(u) {
        if (u) {
            req.session.usuario = u;
            res.send(200, u.toJSON());
        }
        else {
            res.send(500, 'Código inválido');
        }
        // close db connection
        mysql.endConnection(con);
    });
}

function hashCode(s){
    var hash = 0, i, char;
    if (s.length == 0) return hash;
    for (i = 0, l = s.length; i < l; i++) {
        char  = s.charCodeAt(i);
        hash  = ((hash<<5)-hash)+char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function sendConfirmationCode(email, code, callback) {
    // send mail
    var transport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "fred.pantuzza@gmail.com",
            pass: "thf5123peruas6927"
        }
    });
    transport.sendMail({
        from: "fred.pantuzza@gmail.com",
        to: email,
        subject: "WhatsPlace - Confirmação de e-mail",
        generateTextFromHTML: true,
        html: "Bem vindo ao WhatsPlace<br />" +
            "Insira esse código de confirmação no seu aplicativo: " + code
    }, function(err, responseStatus) {
        if (!error) {
            console.log(responseStatus.message); // response from the server
            console.log(responseStatus.messageId); // Message-ID value used
        }
        // force transport to close
        transport.close();
        // return
        callback(err);
    });
}

exports.insert = function insertUser(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var codigoConfirmacao = hashCode(new Date().toDateString());
    var usuario = new Usuario(null, nome, email, senha, null, codigoConfirmacao, null);

    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.insert(con, usuario, function(id) {
        if (id) {
            usuario.setId(id);
            sendConfirmationCode(usuario.getEmail(), usuario.getCodigoConfirmacao(), function(err) {
                if (!err) {
                    res.send(200);
                }
                else {
                    res.send(500);
                }
            });
        }
        else {
            res.send(500);
        }
    });
}

exports.resendConfirmationCode = function resendConfirmationCodeUser(req, res) {
    var usuario = req.session.usuario;
    var codigoConfirmacao = hashCode(new Date().toDateString());

    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.updateConfirmationCode(con, usuario, codigoConfirmacao, function(u) {
        if (u) {
            req.session.usuario = u;
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}

exports.changeLocal = function(req, res) {
    var usuario = req.session.usuario;
    var idLocal = req.body.idLocal;
    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.updateLocal(con, usuario, idLocal, function(u) {
        if (u) {
            usuarioDAO.get(con, usuario.getId(), function(u) {
                if (u) {
                    req.session.usuario = u;
                    res.send(200);
                }
                else {
                    res.send(500);
                }
            })
        }
        else {
            res.send(500);
        }
    });
}

exports.sendMessage = function(req, res){
    var usuario = req.session.usuario;
    var idUsuarioDestinatario = req.body.destinatario;
    var texto = req.body.texto;
    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.sendMessage(con, texto, idUsuarioDestinatario, usuario.getId(), function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
};