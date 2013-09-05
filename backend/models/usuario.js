exports.Usuario = function(id, email, nome, senha, avatar, codigoConfirmacao, universoAtual, localAtual) {
    this.id = id;
    this.email = email;
    this.nome = nome;
    this.senha = senha;
    this.avatar = avatar;
    this.codigoConfirmacao = codigoConfirmacao;
    this.universoAtual = universoAtual;
    this.localAtual = localAtual;

    this.getId = function() {
        return this.id;
    }

    this.getEmail = function() {
        return this.email;
    }

    this.getNome = function() {
        return this.nome;
    }

    this.getSenha = function() {
        return this.senha;
    }

    this.getAvatar = function() {
        return this.avatar;
    }

    this.getCodigoConfirmacao = function() {
        return this.codigoConfirmacao;
    }

    this.getUniversoAtual = function() {
        return this.universoAtual;
    }

    this.getLocalAtual = function() {
        return this.localAtual;
    }

    this.setId = function(novoId) {
        this.id = novoId;
    }

    this.setEmail = function(novoEmail) {
        this.email = novoEmail;
    }

    this.setNome = function(novoNome) {
        this.nome = novoNome;
    }

    this.setSenha = function(novaSenha) {
        this.senha = novaSenha;
    }

    this.setAvatar = function(novoAvatar) {
        this.avatar = novoAvatar;
    }

    this.setCodigoConfirmacao = function(novoCodigoConfirmacao) {
        this.codigoConfirmacao = novoCodigoConfirmacao;
    }

    this.setUniversoAtual = function(novoUniversoAtual) {
        this.universoAtual = novoUniversoAtual;
    }

    this.setLocalAtual = function(novoLocalAtual) {
        this.localAtual = novoLocalAtual;
    }

    this.toJSON = function() {
        var universoAtual = null;
        if (this.getUniversoAtual()) {
            universoAtual = this.getUniversoAtual().toJSON();
        }
        var localAtual = null;
        if (this.getLocalAtual()) {
            localAtual = this.getLocalAtual().toJSON();
        }
        var u = {
            id: this.getId(),
            nome: this.getNome(),
            email: this.getEmail(),
            senha: this.getSenha(),
            avatar: this.getAvatar(),
            codigoConfirmacao: this.getCodigoConfirmacao(),
            universoAtual: universoAtual,
            localAtual: localAtual
        };
        return u;
    }

}