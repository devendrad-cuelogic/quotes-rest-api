var chai = require('chai')
  , server = require('../index.js')
  , expect = require('chai').expect;

describe('Describes Quotes', function() {
  
  describe('Get quotes list', function() {

    it('returns list of quotes', function(done) {
      var options = {
        method: 'GET',
        url   : '/quotes'
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.be.equal(200);
        var result = response.result;
        expect(result).to.be.a('array');
        expect(result[0]).to.include.keys('name','quote_text','_id');
        done();
      });
    });

  });

  describe('Create a quote', function() {

    describe('When data is not correct', function() {
      
      it('reject if data is missing', function (done) {
        var data = {};
        var options = {
          method : 'POST',
          url    : '/quotes',
          payload: data
        };
        server.inject(options, function(response) {
          expect(response.statusCode).to.be.equal(400);
          done();
        });
      });

      it('reject if name is not passed', function (done) {
        var data = {
          quote_text: 'Some quote'
        };
        var options = {
          method : 'POST',
          url    : '/quotes',
          payload: data
        };
        server.inject(options, function(response) {
          expect(response.statusCode).to.be.equal(400);
          done();
        });
      });

      it('reject if quote_text is not passed', function (done) {
        var data = {
          name: 'Some Name'
        };
        var options = {
          method : 'POST',
          url    : '/quotes',
          payload: data
        };
        server.inject(options, function(response) {
          expect(response.statusCode).to.be.equal(400);
          done();
        });
      });

    });

    describe('When data passed is correct', function() {

      it('should save quote object to db', function(done) {
        var data = {
          name      : 'DevD',
          quote_text: 'Another famous quote bye me'
        }
        var options = {
          method : 'POST',
          url    : '/quotes',
          payload: data
        };
        server.inject(options, function(response) {
          expect(response.statusCode).to.be.equal(200);
          var result = response.result;
          expect(result).to.be.a('array');
          expect(result.length).to.be.equal(1);
          expect(result[0]).to.include.keys('name','quote_text','_id');
          done();
        });
      });

    });

  });

  describe('Get a quote by its id', function() {

    it('reject if id is missing', function (done) {
      var id = null;
      var options = {
        method: 'GET',
        url   : '/quotes/' + id
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.be.equal(500);
        done();
      })
    });

    it('return empty array if id not found', function(done) {
      var id = '554b770a95a4f52563b19a20';
      var options = {
        method: 'GET',
        url   : '/quotes/' + id
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.be.equal(200);
        expect(response.result.length).to.be.equal(0);
        done();
      })
    });

    it('returns single quote object when correct id is passed', function(done) {
      var id = '554b770a95a4f52563b19120';
      var options = {
        method: 'GET',
        url   : '/quotes/' + id
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.be.equal(200);
        expect(response.result).to.be.an('object');
        expect(response.result).to.include.keys('_id','name','quote_text');
        done();
      })
    });

  });

  describe('Updates a quote', function() {

    it('rejects if id is missing ', function(done) {
      var data = {
        name: 'Anynoymous'
      };
      var id = null;
      var options = {
        method : 'PUT',
        url    : '/quotes/' + id,
        payload: data
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.be.equal(500);
        done();
      })
    });

    it('rejects if data is missing', function(done) {
      var data = {};
      var id = '554c726090c4ce747eb7cff6';
      var options = {
        method : 'PUT',
        url    : '/quotes/' + id,
        payload: data
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.be.equal(500);
        done();
      })
    });

    it('updates quote with provided data', function(done) {
      var data = {
        name: 'DevD'
      };
      var id = '554c726090c4ce747eb7cff6';
      var options = {
        method : 'PUT',
        url    : '/quotes/' + id,
        payload: data
      };
      server.inject(options, function(response) {
        expect(response.result[1]).to.include.keys('ok');
        expect(response.statusCode).to.be.equal(200);
        done();
      })
    });

  });

  describe('Delete a quote', function() {

    it('returns empty array if quote with id is not found', function (done) {
      var id = '524c5855b8d7e9af6e5f7abd';
      var options = {
        method: 'DELETE',
        url   : '/quotes/' + id
      };
      server.inject(options, function(response) {
        expect(response.result[1].n).to.be.equal(0);
        expect(response.statusCode).to.be.equal(200);
        done();
      })
    });

    it('delete a quotes if id provided is present', function(done) {
      var id = '554c47980b4b8aaa6663b3ee';
      var options = {
        method: 'DELETE',
        url   : '/quotes/' + id
      };
      server.inject(options, function(response) {
        expect(response.result[1].n).to.be.equal(1);
        expect(response.statusCode).to.be.equal(200);
        done();
      })
    });
    
  });

});