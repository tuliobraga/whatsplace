exports.Mensagem = function(id, texto, remetente, destinatario, horario) {
    this.id = id;
    this.texto = texto;
    this.remetente = remetente;
    this.destinatario = destinatario;
    this.horario = horario;

    this.getId = function() {
        return this.id;
    }

    this.getTexto = function() {
        return this.texto;
    }

    this.getRemetente = function() {
        return this.remetente;
    }

    this.getDestinatario = function() {
        return this.destinatario;
    }

    this.getHorario = function() {
        return this.horario;
    }

    this.setId = function(novoId) {
        this.id = novoId;
    }

    this.setTexto = function(novoTexto) {
        this.texto = novoTexto;
    }

    this.setRemetente = function(novoRemetente) {
        this.universo = novoRemetente;
    }

    this.setDestinatario = function(novoDestinatario) {
        this.convidado = novoDestinatario;
    }

    this.setHorario = function(novoHorario) {
        this.pendente = novoHorario;
    }

}