var Usuario = function(id, email, nome, avatar, localAtual) {
    var _id;
    var _email;
    var _nome;
    var _avatar;
    var _localAtual;

    _id = id;
    _email = email;
    _nome = nome;
    _avatar = avatar;
    _localAtual = localAtual;

    this.getId = function() {
        return _id;
    }

    this.getEmail = function() {
        return _email;
    }

    this.getNome = function() {
        return _nome;
    }

    this.getAvatar = function() {
        return _avatar;
    }

    this.getLocalAtual = function() {
        return _localAtual;
    }

    this.setId = function(novoId) {
        _id = novoId;
    }

    this.setEmail = function(novoEmail) {
        _texto = novoEmail;
    }

    this.setNome = function(novoNome) {
        _solicitante = novoNome;
    }

    this.setAvatar = function(novoAvatar) {
        _convidado = novoAvatar;
    }

    this.setLocalAtual = function(novoLocalAtual) {
        _pendente = novoLocalAtual;
    }

}