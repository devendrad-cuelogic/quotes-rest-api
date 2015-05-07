var chai = require("chai");
// var mocha = require('mocha');
var server = require("../index.js");
// var code = require("code");
var expect = require('chai').expect;

describe("Hello", function() {
    it("Testing for list of quotes",function(done){
    	var options = { method: "GET", url:"/"};
      	server.inject(options, function(response){
        	var result = response.result;
        	// console.log(result);
        	expect(response.statusCode).to.be.equal(200);
        	// expect(result).to.equal("Hello World");
        	done();
      	});
	});

	it('Testing for post', function(done) {
		var data = { name : 'DevD' , quote_text : "Anothe famous quote" }
		var options = { method: "POST", url:"/quotes" , payload : data };
		server.inject(options, function(response){
        	var result = response.result;
        	expect(response.statusCode).to.be.equal(200);
        	done();	
      	});
	});
});