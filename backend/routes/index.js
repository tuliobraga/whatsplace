
var usuarioClass = require('../models/usuario');

/*
 * POST home page.
 */

function checkLogged(req, res) {
    if (req.session.usuario === null) {
        res.redirect('/login');
        return false;
    }
    else if (req.session.usuario.codigoConfirmacao === null) {
        res.redirect('/confirmar-conta');
        return false;
    }
    else {
        return true;
    }
}

exports.index = function(req, res){
  res.render('index.html');
};

exports.login = function(req, res){
    res.render('login.html');
};

exports.novaConta = function(req, res){
    res.render('nova_conta.html');
};

exports.criarUniverso = function(req, res){
    res.render('criar_universo.html');
};

exports.confirmarConta = function(req, res) {
    if (req.session.usuario === undefined) {
        res.redirect('/login');
    }
    else if (req.session.usuario.codigoConfirmacao === null) {
        res.redirect('/dashboard');
    }
    else {
        res.render('confirmar_conta.html');
    }
}

exports.dashboard = function(req, res) {
    if (checkLogged(req, res)) {
        res.render('dashboard.html');
    }
}

exports.novoUniverso = function(req, res) {
    if (checkLogged(req, res)) {
        res.render('novo_universo.html');
    }
}

exports.exibirConvites = function(req, res) {
    if (checkLogged(req, res)) {
        res.render('solicitacoes_universo.html');
    }
}
