
exports.Usuario = function(id, email, nome, senha, avatar, codigoConfirmacao, localAtual) {
    this._id = id;
    this._email = email;
    this._nome = nome;
    this._senha = senha;
    this._avatar = avatar;
    this._codigoConfirmacao = codigoConfirmacao;
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

    this.getLocalAtual = function() {
        return this._localAtual;
    }

    this.setId = function(novoId) {
        this._id = novoId;
    }

    this.setEmail = function(novoEmail) {
        this._texto = novoEmail;
    }

    this.setNome = function(novoNome) {
        this._universo = novoNome;
    }

    this.setSenha = function(novaSenha) {
        this._senha = novaSenha;
    }

    this.setAvatar = function(novoAvatar) {
        this._convidado = novoAvatar;
    }

    this.setCodigoConfirmacao = function(novoCodigoConfirmacao) {
        this._codigoConfirmacao = novoCodigoConfirmacao;
    }

    this.setLocalAtual = function(novoLocalAtual) {
        this._pendente = novoLocalAtual;
    }

    this.toJSON = function() {
        var u = {
            id: this.getId(),
            nome: this.getNome(),
            email: this.getEmail(),
            senha: this.getSenha(),
            avatar: this.getAvatar(),
            codigoConfirmacao: this.getCodigoConfirmacao(),
            localAtual: this.getLocalAtual()
        };
        return u;
    }

}