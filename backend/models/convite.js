exports.Convite = function(universo, convidado, texto, pendente) {
    this.universo = universo;
    this.convidado = convidado;
    this.texto = texto;
    this.pendente = pendente;

    this.getUniverso = function() {
        return this.universo;
    }

    this.getConvidado = function() {
        return this.convidado;
    }

    this.getTexto = function() {
        return this.texto;
    }

    this.isPendente() {
        return this.pendente;
    }

    this.setUniverso = function(novoUniverso) {
        this.universo = novoUniverso;
    }

    this.setConvidado = function(novoConvidado) {
        this.convidado = novoConvidado;
    }

    this.setTexto = function(novoTexto) {
        this.texto = novoTexto;
    }

    this.setPendente = function(novoPendente) {
        this.pendente = novoPendente;
    }

}