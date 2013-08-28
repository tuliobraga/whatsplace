var Convite = function(id, solicitante, convidado, texto, pendente) {
    this._id = id;
    this._solicitante = solicitante;
    this._convidado = convidado;
    this._texto = texto;
    this._pendente = pendente;

    this.getId = function() {
        return this._id;
    }

    this.getSolicitante = function() {
        return this._solicitante;
    }

    this.getConvidado = function() {
        return this._convidado;
    }

    this.getTexto = function() {
        return this._texto;
    }

    this.isPendente() {
        return this._pendente;
    }

    this.setId = function(novoId) {
        this._id = novoId;
    }

    this.setSolicitante = function(novoSolicitante) {
        this._solicitante = novoSolicitante;
    }

    this.setConvidado = function(novoConvidado) {
        this._convidado = novoConvidado;
    }

    this.setTexto = function(novoTexto) {
        this._texto = novoTexto;
    }

    this.setPendente = function(novoPendente) {
        this._pendente = novoPendente;
    }

}