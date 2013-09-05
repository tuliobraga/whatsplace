exports.Universo = function(id, nome, privado, administrador, locais) {
	this.id = id;
    this.nome = nome;
    this.privado = privado;
    this.administrador = administrador;
    this.locais = locais;
	
	this.getId = function() {
		return this.id;
	}
	
	this.getNome = function() {
		return this.nome;
	}
	
	this.isPrivado = function() {
		return this.privado;
	}
	
	this.getAdministrador = function() {
		return this.administrador;
	}

    this.getLocais = function() {
        return this.locais;
    }
	
	this.setId = function(novoId) {
        this.id = novoId;
	}
	
	this.setNome = function(novoNome) {
        this.nome = novoNome;
	}
	
	this.setPrivado = function(novoPrivado) {
        this.privado = novoPrivado;
	}
	
	this.setAdministrador = function(novoAdministrador) {
        this.administrador = novoAdministrador;
	}

    this.setLocais = function(novosLocais) {
        this.locais = novosLocais;
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