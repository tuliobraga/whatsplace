var Universo = function(id, nome, privado, administrador) {
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
	
	this.getPrivado = function() {
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
	
}