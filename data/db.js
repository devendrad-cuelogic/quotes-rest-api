var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/quotesdb', {
	safe: true
});

var Promise = require('bluebird');

db.ObjectID = mongoskin.ObjectID;
db.bind('quotes').bind({
	getAllQuotes: function getAllQuotes(callback) {
		this.find({}, {
			limit: 10,
			sort: [
				['_id', -1]
			]
		}).toArray(callback);
	},
	getById: function getById(id, callback) {
		this.findOne({
			_id: db.ObjectID(id)
		}, callback)
	},
	deleteById: function deleteById(id, callback) {
		this.remove({
			_id: db.ObjectID(id)
		}, callback)
	},
	updateWithId: function updateWithId(id, object, callback) {
		this.update({
			_id: db.ObjectID(id)
		}, {
			$set: object
		}, callback)
	},
	createQuote: function createQuote(object, callback) {
		this.insert(object, callback)
	}
});

Promise.promisifyAll(db.quotes);

module.exports = db;