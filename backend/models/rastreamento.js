exports.Rastreamento = function Rastreamento(id, entrada, saida, local, usuario) {
    this._id = id;
    this._entrada = entrada;
    this._saida = saida;
    this._local = local;
    this._usuario = usuario;

    this.getId = function() {
        return this._id;
    }

    this.getEntrada = function() {
        return this._entrada;
    }

    this.getSaida = function() {
        return this._saida;
    }

    this.getLocal = function() {
        return this._local;
    }

    this.getUsuario = function() {
        return this._usuario;
    }

    this.setId = function(novoId) {
        this._id = novoId;
    }

    this.setEntrada = function(novoEntrada) {
        this._texto = novoEntrada;
    }

    this.setSaida = function(novoSaida) {
        this._universo = novoSaida;
    }

    this.setLocal = function(novoLocal) {
        this._convidado = novoLocal;
    }

    this.setUsuario = function(novoUsuario) {
        this._pendente = novoUsuario;
    }

}