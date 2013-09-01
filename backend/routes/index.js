
/*
 * GET home page.
 */

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
    res.render('confirmar_conta.html');
}

exports.dashboard = function(req, res) {
    res.render('dashboard.html');
}
