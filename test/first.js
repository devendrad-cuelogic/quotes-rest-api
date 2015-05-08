var chai = require("chai");
// var mocha = require('mocha');
var server = require("../index.js");
// var code = require("code");
var expect = require('chai').expect;

describe("Describes Quotes", function() {

  it("Testing for list of quotes", function(done) {
    var options = {
      method: "GET",
      url: "/quotes"
    };
    server.inject(options, function(response) {
      var result = response.result;
      // console.log(result);
      expect(response.statusCode).to.be.equal(200);
      // expect(result).to.equal("Hello World");
      done();
    });
  });

  it('Testing for post', function(done) {
    var data = {
      name: 'DevD',
      quote_text: "Another famous quote bye me"
    }
    var options = {
      method: "POST",
      url: "/quotes",
      payload: data
    };
    server.inject(options, function(response) {
      var result = response.result;
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  });

  it('Retrieves single quote object', function(done) {
    var id = '554b770a95a4f52563b19120';
    var options = {
      method: "GET",
      url: "/quotes/" + id
    };
    server.inject(options, function(response) {
      expect(response.statusCode).to.be.equal(200);
      done();
    })
  });

  it('Updates quotes text with an id ', function(done) {
    var data = {
      name: "Anynoymous"
    };
    var id = '554b770a95a4f52563b19120';
    var options = {
      method: "PUT",
      url: '/quotes/' + id,
      payload: data
    };
    server.inject(options, function(response) {
      expect(response.statusCode).to.be.equal(200);
      done();
    })
  });


  it('Deletes a quotes with an id', function(done) {
    var id = "554c5855b8d7e9af6e5f7abd";
    var options = {
      method: "DELETE",
      url: '/quotes/' + id
    };
    server.inject(options, function(response) {
      expect(response.statusCode).to.be.equal(200);
      done();
    })
  });

});