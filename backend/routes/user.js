var nodemailer   = require('nodemailer');
var mysql        = require('../control/db/connection');
var usuarioDAO   = require('../control/db/usuarioDAO');
var usuarioClass = require('../models/usuario');

exports.authenticate = function(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;
res.send(500, 'E-mail ou senha inválidos');
    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.getWithPass(con, email, senha, function(u) {
        if (u) {
            if (u.getCodigoConfirmacao()) {
                res.send(500, 'Você ainda não confirmou seu e-mail');
            }
            else {
                req.session.usuario = u;
                res.send(200, 'Logado com sucesso');
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
    var codigo = req.body.codigo;
    codigo = '-1792633853';

    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.confirmEmail(con, codigo, function(u) {
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
        host: "mail.tbrtec.com", // hostname
        secureConnection: false, // use SSL
        port: 26, // port for secure SMTP
        auth: {
            user: "frederico.pantuzza@tbrtec.com",
            pass: "thf5123"
        }
    });
    transport.sendMail({
        from: "frederico.pantuzza@tbrtec.com",
        to: email,
        subject: "WhatsPlace - Confirmação de e-mail",
        generateTextFromHTML: true,
        html: "Bem vindo ao WhatsPlace<br />" +
            "Insira esse código de confirmação no seu aplicativo: " + code
    }, function(err, responseStatus) {
        if (!err) {
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
    var senha2 = req.body.confirmarSenha;
    if (senha !== senha2) {
        res.send(500, 'Senhas informadas são diferentes');
    }
    else {
        var codigoConfirmacao = hashCode(new Date().toDateString());
        var usuario = new usuarioClass.Usuario(null, email, nome, senha, null, codigoConfirmacao, null);

        // connect to database
        var con = mysql.getConnection();
        usuarioDAO.insert(con, usuario, function(id) {
            if (id) {
                usuario.setId(id);
                sendConfirmationCode(usuario.getEmail(), usuario.getCodigoConfirmacao(), function(err) {
                    if (!err) {
                        res.send(200, 'Logado com sucesso');
                    }
                    else {
                        res.send(500, 'Erro enviando código de confirmação por e-mail');
                        console.log(err);
                    }
                });
            }
            else {
                res.send(500);
            }
        });
    }
}

exports.resendConfirmationCode = function resendConfirmationCodeUser(req, res) {
    var email = req.body.email;
    var codigoConfirmacao = hashCode(new Date().toDateString());

    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.updateConfirmationCode(con, email, codigoConfirmacao, function(err) {
        if (!err) {
            res.send(200);
        }
        else {
            res.send(500);
        }
    });
}

exports.list = function(req, res){
  res.send("respond with a resource");
};