var nodemailer = require('nodemailer');
var mysql = require('../control/db/connection');
var usuarioDAO = require('../control/db/usuarioDAO');

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
    var email = req.body.email;
    var codigo = req.body.codigo;

    // connect to database
    var con = mysql.getConnection();
    usuarioDAO.confirmEmail(con, email, codigo, function(u) {
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