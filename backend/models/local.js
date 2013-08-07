var Local = function(id, universo, nome, latitude, longitude, gerente) {
	var _id;
	var _universo;
	var _nome;
	var _latitude;
	var _longitude;
	var _gerente;
	
	_id = id;
	_universo = universo;
	_nome = nome;
	_latitude = latitude;
	_longitude = longitude;
	_gerente = gerente;
	
	this.getId = function() {
		return _id;
	}
	
	this.getUniverso = function() {
		return _universo;
	}
	
	this.getNome = function() {
		return _nome;
	}
	
	this.getLatitude = function() {
		return _latitude;
	}
	
	this.getLongitude = function() {
		return _longitude;
	}
	
	this.getGerente = function() {
		return _gerente;
	}
	
	this.setId = function(novoId) {
		_id = novoId;
	}
	
	this.setUniverso = function(novoUniverso) {
		_universo = novoUniverso;
	}
	
	this.setNome = function(novoNome) {
		_nome = novoNome;
	}
	
	this.setLatitude = function(novoLatitude) {
		_latitude = novoLatitude;
	}
	
	this.setLongitude = function(novoLongitude) {
		_longitude = novoLongitude;
	}
	
	this.getGerente = function(novoGerente) {
		_gerente = novoGerente;
	}
	
}