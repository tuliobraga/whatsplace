var Universo = function(id, nome, privado, administrador) {
	var _id;
	var _nome;
	var _privado;
	var _administrador;
	
	_id = id;
	_nome = nome;
	_privado = privado;
	_administrador = administrador;
	
	this.getId = function() {
		return _id;
	}
	
	this.getNome = function() {
		return _nome;
	}
	
	this.getPrivado = function() {
		return _privado;
	}
	
	this.getAdministrador = function() {
		return _administrador;
	}
	
	this.setId = function(novoId) {
		_id = novoId;
	}
	
	this.setNome = function(novoNome) {
		_nome = novoNome;
	}
	
	this.setPrivado = function(novoPrivado) {
		_privado = novoPrivado;
	}
	
	this.setAdministrador = function(novoAdministrador) {
		_administrador = novoAdministrador;
	}
	
}