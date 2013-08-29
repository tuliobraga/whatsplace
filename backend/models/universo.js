exports.Universo = function Universo(id, nome, privado, administrador) {
	this._id = id;
    this._nome = nome;
    this._privado = privado;
    this._administrador = administrador;
	
	this.getId = function() {
		return this._id;
	}
	
	this.getNome = function() {
		return this._nome;
	}
	
	this.isPrivado = function() {
		return this._privado;
	}
	
	this.getAdministrador = function() {
		return this._administrador;
	}
	
	this.setId = function(novoId) {
        this._id = novoId;
	}
	
	this.setNome = function(novoNome) {
        this._nome = novoNome;
	}
	
	this.setPrivado = function(novoPrivado) {
        this._privado = novoPrivado;
	}
	
	this.setAdministrador = function(novoAdministrador) {
        this._administrador = novoAdministrador;
	}

    this.toJSON() = function() {
        var u = {
            id: this.getId(),
            nome: this.getNome(),
            private: this.isPrivado(),
            administrador: this.getAdministrador().toJSON()
        };
        return u;
    }
	
}