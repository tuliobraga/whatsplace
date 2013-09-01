exports.Usuario = function(id, email, nome, senha, avatar, codigoConfirmacao, universoAtual, localAtual) {
    this._id = id;
    this._email = email;
    this._nome = nome;
    this._senha = senha;
    this._avatar = avatar;
    this._codigoConfirmacao = codigoConfirmacao;
    this._universoAtual = universoAtual;
    this._localAtual = localAtual;

    this.getId = function() {
        return this._id;
    }

    this.getEmail = function() {
        return this._email;
    }

    this.getNome = function() {
        return this._nome;
    }

    this.getSenha = function() {
        return this._senha;
    }

    this.getAvatar = function() {
        return this._avatar;
    }

    this.getCodigoConfirmacao = function() {
        return this._codigoConfirmacao;
    }

    this.getUniversoAtual = function() {
        return this._universoAtual;
    }

    this.getLocalAtual = function() {
        return this._localAtual;
    }

    this.setId = function(novoId) {
        this._id = novoId;
    }

    this.setEmail = function(novoEmail) {
        this._email = novoEmail;
    }

    this.setNome = function(novoNome) {
        this._nome = novoNome;
    }

    this.setSenha = function(novaSenha) {
        this._senha = novaSenha;
    }

    this.setAvatar = function(novoAvatar) {
        this._avatar = novoAvatar;
    }

    this.setCodigoConfirmacao = function(novoCodigoConfirmacao) {
        this._codigoConfirmacao = novoCodigoConfirmacao;
    }

    this.setUniversoAtual = function(novoUniversoAtual) {
        this._universoAtual = novoUniversoAtual;
    }

    this.setLocalAtual = function(novoLocalAtual) {
        this._localAtual = novoLocalAtual;
    }

    this.toJSON() = function() {
        var u = {
            id: this.getId(),
            nome: this.getNome(),
            email: this.getEmail(),
            senha: this.getSenha(),
            avatar: this.getAvatar(),
            codigoConfirmacao: this.getCodigoConfirmacao(),
            universoAtual: this.getUniversoAtual().toJSON(),
            localAtual: this.getLocalAtual().toJSON()
        };
        return u;
    }

}