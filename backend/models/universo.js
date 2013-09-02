exports.Universo = function(id, nome, privado, administrador, locais) {
	this._id = id;
    this._nome = nome;
    this._privado = privado;
    this._administrador = administrador;
    this._locais = locais;
	
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

    this.getLocais = function() {
        return this._locais;
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

    this.setLocais = function(novosLocais) {
        this._locais = novosLocais;
    }

    this.toJSON = function() {
        var locais = [];
        for (var l in this.getLocais()) {
            locais.push(l.toJSON());
        }
        var u = {
            id: this.getId(),
            nome: this.getNome(),
            private: this.isPrivado(),
            administrador: this.getAdministrador().toJSON(),
            locais: locais
        };
        return u;
    }
	
}