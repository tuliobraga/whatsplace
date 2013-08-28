var Mensagem = function(id, texto, remetente, destinatario, horario) {
    this._id = id;
    this._texto = texto;
    this._remetente = remetente;
    this._destinatario = destinatario;
    this._horario = horario;

    this.getId = function() {
        return this._id;
    }

    this.getTexto = function() {
        return this._texto;
    }

    this.getRemetente = function() {
        return this._remetente;
    }

    this.getDestinatario = function() {
        return this._destinatario;
    }

    this.getHorario = function() {
        return this._horario;
    }

    this.setId = function(novoId) {
        this._id = novoId;
    }

    this.setTexto = function(novoTexto) {
        this._texto = novoTexto;
    }

    this.setRemetente = function(novoRemetente) {
        this._solicitante = novoRemetente;
    }

    this.setDestinatario = function(novoDestinatario) {
        this._convidado = novoDestinatario;
    }

    this.setHorario = function(novoHorario) {
        this._pendente = novoHorario;
    }

}