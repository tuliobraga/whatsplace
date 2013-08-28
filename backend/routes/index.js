
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