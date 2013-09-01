exports.Local = function(id, nome, latitude, longitude) {
    this._id = id;
    this._nome = nome;
    this._latitude = latitude;
    this._longitude = longitude;
	
	this.getId = function() {
		return this._id;
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
	
	this.setId = function(novoId) {
        this._id = novoId;
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
	
}