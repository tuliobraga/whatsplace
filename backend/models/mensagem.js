var Mensagem = function(id, texto, remetente, destinatario, horario) {
    var _id;
    var _texto;
    var _remetente;
    var _destinatario;
    var _horario;

    _id = id;
    _texto = texto;
    _remetente = remetente;
    _destinatario = destinatario;
    _horario = horario;

    this.getId = function() {
        return _id;
    }

    this.getTexto = function() {
        return _texto;
    }

    this.getRemetente = function() {
        return _remetente;
    }

    this.getDestinatario = function() {
        return _destinatario;
    }

    this.getHorario = function() {
        return _horario;
    }

    this.setId = function(novoId) {
        _id = novoId;
    }

    this.setTexto = function(novoTexto) {
        _texto = novoTexto;
    }

    this.setRemetente = function(novoRemetente) {
        _solicitante = novoRemetente;
    }

    this.setDestinatario = function(novoDestinatario) {
        _convidado = novoDestinatario;
    }

    this.setHorario = function(novoHorario) {
        _pendente = novoHorario;
    }

}