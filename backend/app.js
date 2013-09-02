
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , universe = require('./routes/universe')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret: 'whatsplace'
}));
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.dashboard);
app.get('/login', routes.login);
app.get('/nova-conta', routes.novaConta);
app.get('/confirmar-conta', routes.confirmarConta);
app.get('/dashboard', routes.dashboard);
app.get('/novo-universo', routes.novoUniverso);
app.get('/solicitacoes-universo', routes.exibirConvites);
app.get('/criar-universo', routes.criarUniverso);
app.get('/criar-local-passo1', routes.criarLocal1);
app.get('/criar-local-passo2', routes.criarLocal2);
app.get('/buscar-universo', routes.buscarUniversos);
app.get('/buscar-local', routes.buscarLocais);
app.get('/buscar-usuario', routes.buscarUsuarios);
app.get('/mensagem', routes.mensagem);
app.get('/detalhes-local', routes.detalhesLocal);
app.get('/detalhes-universo', routes.detalhesUniverso);
app.get('/detalhes-usuario', routes.detalhesUsuario);
app.get('/usuarios-local', routes.usuariosLocal);
app.post('/in/detalhes-usuario', user.get);
app.post('/in/login', user.authenticate);
app.post('/in/criar-conta', user.insert);
app.post('/in/confirmar-conta', user.confirmEmail);
app.post('/in/selecionar-local', user.changeLocal);
app.post('/in/enviar-mensagem', user.sendMessage);
app.post('/in/criar-universo', universe.insert);
app.post('/in/excluir-universo', universe.delete);
app.post('/in/convidar-universo', universe.insertConvite);
app.post('/in/solicitacoes-universo', universe.listConvites);
app.post('/in/aceitar-universo', universe.acceptConvite);
app.post('/in/recusar-universo', universe.refuseConvite);
app.post('/in/sair-universo', universe.removeUser);
app.post('/in/listar-universos', universe.listUserUniverses);
app.post('/in/listar-locais', universe.listLocals);
app.post('/in/listar-usuarios-universo', universe.listUsers);
app.post('/in/listar-usuarios-local', universe.listUsersLocal);
app.post('/in/deixar-local', universe.leaveLocal);
app.post('/in/buscar-usuario-universo', universe.searchUsers);
app.post('/in/buscar-universo', universe.search);
app.post('/in/criar-local', universe.insertLocal);
app.post('/in/excluir-local', universe.excluirLocal);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
