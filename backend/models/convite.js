exports.Convite = function(universo, convidado, texto, pendente) {
    this._universo = universo;
    this._convidado = convidado;
    this._texto = texto;
    this._pendente = pendente;

    this.getUniverso = function() {
        return this._universo;
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

    this.setUniverso = function(novoUniverso) {
        this._universo = novoUniverso;
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