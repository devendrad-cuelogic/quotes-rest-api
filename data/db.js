var mongoskin = require('mongoskin');
var	db = mongoskin.db('mongodb://localhost:27017/quotesdb', {safe:true});

db.ObjectID = mongoskin.ObjectID;
// db.bind('quotes');
db.bind('quotes').bind({
	getAllQuotes : function getAllQuotes(callback) {
		// this.find().toArray
		this.find({},{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
    		if (e) return e;
    		callback( results );
  		})
	}
});

module.exports = db;