
var usuarioClass = require('../models/usuario');

/*
 * POST home page.
 */

function checkLogged(req, res) {
    if (req.session.usuario === undefined) {
        res.redirect('/login');
        return false;
    }
    else if (req.session.usuario.codigoConfirmacao !== null) {
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
    if (checkLogged(req, res)) {
        res.render('criar_universo.html');
    }
};

exports.criarLocal1 = function(req, res){
    if (checkLogged(req, res)) {
        res.render('criar_local_passo1.html');
    }
};

exports.criarLocal2 = function(req, res){
    if (checkLogged(req, res)) {
        res.render('criar_local_passo2.html');
    }
};

exports.buscarLocais = function(req, res){
    if (checkLogged(req, res)) {
        res.render('buscar_locais.html');
    }
};

exports.buscarUsuarios = function(req, res){
    if (checkLogged(req, res)) {
        res.render('buscar_usuarios.html');
    }
};

exports.buscarUniversos = function(req, res){
    if (checkLogged(req, res)) {
        res.render('buscar_universos.html');
    }
};

exports.mensagem = function(req, res){
    if (checkLogged(req, res)) {
        res.render('mensagem.html');
    }
};

exports.detalhesLocal = function(req, res){
    if (checkLogged(req, res)) {
        res.render('detalhes_local.html');
    }
};

exports.detalhesUniverso = function(req, res){
    if (checkLogged(req, res)) {
        res.render('detalhes_universo.html');
    }
};

exports.detalhesUsuario = function(req, res){
    if (checkLogged(req, res)) {
        res.render('detalhes_usuario.html');
    }
};

exports.usuariosLocal = function(req, res){
    if (checkLogged(req, res)) {
        res.render('usuarios_do_local.html');
    }
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
