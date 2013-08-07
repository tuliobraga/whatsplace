var Rastreamento = function(id, entrada, saida, local, usuario) {
    var _id;
    var _entrada;
    var _saida;
    var _local;
    var _usuario;

    _id = id;
    _entrada = entrada;
    _saida = saida;
    _local = local;
    _usuario = usuario;

    this.getId = function() {
        return _id;
    }

    this.getEntrada = function() {
        return _entrada;
    }

    this.getSaida = function() {
        return _saida;
    }

    this.getLocal = function() {
        return _local;
    }

    this.getUsuario = function() {
        return _usuario;
    }

    this.setId = function(novoId) {
        _id = novoId;
    }

    this.setEntrada = function(novoEntrada) {
        _texto = novoEntrada;
    }

    this.setSaida = function(novoSaida) {
        _solicitante = novoSaida;
    }

    this.setLocal = function(novoLocal) {
        _convidado = novoLocal;
    }

    this.setUsuario = function(novoUsuario) {
        _pendente = novoUsuario;
    }

}