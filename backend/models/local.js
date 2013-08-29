exports.Local = function Local(id, universo, nome, latitude, longitude, gerente) {
    this._id = id;
    this._universo = universo;
    this._nome = nome;
    this._latitude = latitude;
    this._longitude = longitude;
    this._gerente = gerente;
	
	this.getId = function() {
		return this._id;
	}
	
	this.getUniverso = function() {
		return this._universo;
	}
	
	this.getNome = function() {
		return this._nome;
	}
	
	this.getLatitude = function() {
		return this._latitude;
	}
	
	this.getLongitude = function() {
		return this._longitude;
	}
	
	this.getGerente = function() {
		return this._gerente;
	}
	
	this.setId = function(novoId) {
        this._id = novoId;
	}
	
	this.setUniverso = function(novoUniverso) {
        this._universo = novoUniverso;
	}
	
	this.setNome = function(novoNome) {
        this._nome = novoNome;
	}
	
	this.setLatitude = function(novoLatitude) {
        this._latitude = novoLatitude;
	}
	
	this.setLongitude = function(novoLongitude) {
        this._longitude = novoLongitude;
	}
	
	this.setGerente = function(novoGerente) {
        this._gerente = novoGerente;
	}
	
}