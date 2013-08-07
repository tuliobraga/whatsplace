var Convite = function(id, solicitante, convidado, texto, pendente) {
    var _id;
    var _solicitante;
    var _convidado;
    var _texto;
    var _pendente;

    _id = id;
    _solicitante = solicitante;
    _convidado = convidado;
    _texto = texto;
    _pendente = pendente;

    this.getId = function() {
        return _id;
    }

    this.getSolicitante = function() {
        return _solicitante;
    }

    this.getConvidado = function() {
        return _convidado;
    }

    this.getTexto = function() {
        return _texto;
    }

    this.isPendente() {
        return _pendente;
    }

    this.setId = function(novoId) {
        _id = novoId;
    }

    this.setSolicitante = function(novoSolicitante) {
        _solicitante = novoSolicitante;
    }

    this.setConvidado = function(novoConvidado) {
        _convidado = novoConvidado;
    }

    this.setTexto = function(novoTexto) {
        _texto = novoTexto;
    }

    this.setPendente = function(novoPendente) {
        _pendente = novoPendente;
    }

}