var Hapi = require("hapi");
var server = new Hapi.Server();
var Joi = require('joi');
var db = require('./data/db');

server.connection({
	host: "localhost",
	port: 9000
})

var pack = require('./package'),
	swaggerOptions = {
		apiVersion: pack.version
	};

server.register({
	register: require('hapi-swagger'),
	options: swaggerOptions
}, function(err) {
	if (err) {
		server.log(['error'], 'hapi-swagger load error: ' + err)
	} else {
		server.log(['start'], 'hapi-swagger interface loaded')
	}
});

server.route({
	method: 'GET',
	path: '/quotes',
	handler: function(request, reply) {
		db.quotes.getAllQuotesAsync().then(function(result) {
			reply(result);
		}, function(err) {
			reply(err);
		});
	},
	config: {
		description: 'Get quotes',
		notes: 'Returns a list of quotes',
		tags: ['api'],
	}
});

server.route({
	method: 'POST',
	path: '/quotes',
	handler: function(req, reply) {
		db.quotes.createQuoteAsync(req.payload).then(function(res) {
			reply(res);
		}, function(err) {
			reply(err);
		});

	},
	config: {
		description: 'Craete a quote',
		notes: 'Craetes a quote whose params are posted',
		tags: ['api'],
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
		db.quotes.getByIdAsync(req.params.id).then(function(res) {
			reply(res);
		}, function(err) {
			reply(err);
		});

	},
	config: {
		description: 'Get a quote',
		notes: 'Returns a quote of an id passed in path',
		tags: ['api'],
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
		db.quotes.updateWithIdAsync(req.params.id, req.payload).then(function(res) {
			reply(res);
		}, function(err) {
			reply(err);
		});
	},
	config: {
		description: 'Update quote',
		notes: 'Upadtes quote object of provided id in path',
		tags: ['api'],
		validate: {
			params: {
				id: Joi.string().required()
			},
			payload: {
				name: Joi.string().min(4).max(100),
				quotes_text: Joi.string().min(10).max(255)
			}
		}
	}
});


server.route({
	method: 'DELETE',
	path: '/quotes/{id}',
	handler: function(req, reply) {
		db.quotes.deleteByIdAsync(req.params.id).then(function(res) {
			reply(res);
		}, function(err) {
			reply(err);
		});
	},
	config: {
		description: 'Delete a quote',
		notes: 'Deletes a quote whose id is passed in path',
		tags: ['api'],
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