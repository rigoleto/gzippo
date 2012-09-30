
/**
 * Module dependencies.
 */

var connect = require('connect'),
		assert = require('assert'),
		should = require('should'),
		http = require('http'),
		gzippo = require('../');

/**
 * Path to ./test/fixtures/
 */

var fixturesPath = __dirname + '/fixtures';

module.exports = {
	'requesting without a prefix succeeds': function() {
		var app = connect().use(
			gzippo.staticGzip(fixturesPath)
		);

		assert.response(app,
			{
				url: '/user.json',
				headers: {
					'Accept-Encoding':"gzip"
				}
			},
			function(res){
				var gzippedData = res.body;
				res.statusCode.should.equal(200);
				res.headers.should.have.property('content-type', 'application/json; charset=UTF-8');
				res.headers.should.have.property('content-length', '69');
				res.headers.should.have.property('content-encoding', 'gzip');
			}
		);
	},
	'requesting with a prefix succeeds': function() {
		var app = connect().use(
			gzippo.staticGzip(fixturesPath, { prefix: '/resource' })
		);

		assert.response(app,
			{
				url: '/resource/user.json',
				headers: {
					'Accept-Encoding':"gzip"
				}
			},
			function(res){
				var gzippedData = res.body;
				res.statusCode.should.equal(200);
				res.headers.should.have.property('content-type', 'application/json; charset=UTF-8');
				res.headers.should.have.property('content-length', '69');
				res.headers.should.have.property('content-encoding', 'gzip');
			}
		);
	},
	'requesting with a / prefix succeeds': function() {
		var app = connect.createServer(
			gzippo.staticGzip(fixturesPath, { prefix: '/'})
		);

		assert.response(app,
			{
				url: '/user.json',
				headers: {
					'Accept-Encoding':"gzip"
				}
			},
			function(res){
				var gzippedData = res.body;
				res.statusCode.should.equal(200);
				res.headers.should.have.property('content-type', 'application/json; charset=UTF-8');
				res.headers.should.have.property('content-length', '69');
				res.headers.should.have.property('content-encoding', 'gzip');
			}
		);
	}
};
