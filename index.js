var Hapi = require("hapi");
var server = new Hapi.Server();
var Joi = require('joi');
var db = require('./data/db');

server.connection({
	host: "localhost",
	port: 9000
})

server.route({
	method: 'GET',
	path: '/quotes',
	handler: function(request, reply) {
		db.quotes.getAllQuotes(reply);
	}
});

server.route({
	method: 'POST',
	path: '/quotes',
	handler: function(req, reply) {
		db.quotes.createQuote(req.payload, reply);

	},
	config: {
		validate: {
			payload: {
				name: Joi.string().required(),
				quote_text: Joi.string().required()
			}
		}
	}
});

server.route({
	method: 'GET',
	path: '/quotes/{id}',
	handler: function(req, reply) {
		db.quotes.getById(req.params.id, reply);

	},
	config: {
		validate: {
			params: {
				id: Joi.string().required()
			}
		}
	}
});


server.route({
	method: 'PUT',
	path: '/quotes/{id}',
	handler: function(req, reply) {
		db.quotes.updateWithId(req.params.id, req.payload, reply);
	},
	config: {
		validate: {
			params: {
				id: Joi.string().required()
			}
		}
	}
});


server.route({
	method: 'DELETE',
	path: '/quotes/{id}',
	handler: function(req, reply) {
		db.quotes.deleteById(req.params.id, reply);
	},
	config: {
		validate: {
			params: {
				id: Joi.string().required()
			}
		}
	}
});

server.start();

console.log('hello server http://localhost:9000');

module.exports = server;