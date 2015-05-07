var Hapi = require("hapi");
var server = new Hapi.Server();
var Joi = require('joi');
// var db = require('./data/db');
var mongoskin = require('mongoskin');
var	db = mongoskin.db('mongodb://localhost:27017/quotesdb', {safe:true});

db.ObjectID = mongoskin.ObjectID;

// console.log(db);
server.connection({host:"localhost",port:9000})

server.route({ 
	method: 'GET', 
	path: '/', 
	handler: function(request, reply) {
		// console.log("I AM HERE");
		db.collection('quotes').find({},{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
    		if (e) throw e;
    		reply(results);
  		});
	}
});

server.route({
	method: 'POST',
	path: '/quotes',
	handler: function (req,reply) {
		db.collection('quotes').insert(req.payload,{},function(e, results){
    		if (e) throw e;
    		reply(results);
  		});
	},
	config : {
		validate : {
			payload : {
				name : Joi.string().required(),
				quote_text : Joi.string().required()
			}
		}
	}
});

server.start();

console.log('hello server http://localhost:9000');

module.exports = server;