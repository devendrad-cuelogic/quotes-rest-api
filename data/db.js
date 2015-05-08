var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/quotesdb', {
	safe: true
});

db.ObjectID = mongoskin.ObjectID;
db.bind('quotes').bind({
	getAllQuotes: function getAllQuotes(callback) {
		this.find({}, {
			limit: 10,
			sort: [
				['_id', -1]
			]
		}).toArray(function(e, results) {
			if (e) return e;
			callback(results);
		})
	},
	getById: function getById(id, callback) {
		this.findOne({
			_id: db.ObjectID(id)
		}, function(e, res) {
			if (e) {
				throw e
			};
			if (res) {
				callback(res)
			};
		})
	},
	deleteById: function deleteById(id, callback) {
		this.remove({
			_id: db.ObjectID(id)
		}, function(e, res) {
			if (e) {
				throw e
			};
			if (res) {
				callback(res)
			};
		})
	},
	updateWithId: function updateWithId(id, object, callback) {
		this.update({
			_id: db.ObjectID(id)
		}, {
			$set: object
		}, function(e, res) {
			if (e) {
				throw e
			};
			if (res) {
				callback(res)
			};
		})
	},
	createQuote: function createQuote(object, callback) {
		this.insert(object, function(e, res) {
			if (e) {
				throw e
			};
			if (res) {
				callback(res)
			};
		})
	}
});

module.exports = db;