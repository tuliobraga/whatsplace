exports.Local = function(id, nome, latitude, longitude) {
    this.id = id;
    this.nome = nome;
    this.latitude = latitude;
    this.longitude = longitude;
	
	this.getId = function() {
		return this.id;
	}
	
	this.getNome = function() {
		return this.nome;
	}
	
	this.getLatitude = function() {
		return this.latitude;
	}
	
	this.getLongitude = function() {
		return this.longitude;
	}
	
	this.setId = function(novoId) {
        this.id = novoId;
	}
	
	this.setNome = function(novoNome) {
        this.nome = novoNome;
	}
	
	this.setLatitude = function(novoLatitude) {
        this.latitude = novoLatitude;
	}
	
	this.setLongitude = function(novoLongitude) {
        this.longitude = novoLongitude;
	}

    this.toJSON = function() {
        var l = {
            id: this.getId(),
            nome: this.getNome(),
            latitude: this.getLatitude(),
            longitude: this.getLongitude()
        }
        return l;
    }
	
}