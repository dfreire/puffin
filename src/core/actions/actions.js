var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var data = require(path.join(__dirname, '..', '..', '..', 'data', 'data.json'));

var types = (function() {
	var types = {};

	var dirs = [
		path.join(__dirname, '..', '..', 'core', 'types'),
		path.join(__dirname, '..', '..', 'app', 'types')
	];

	_.each(dirs, function(dir) {
		_.each(fs.readdirSync(dir), function(filename) {
			var name = filename.split('.json')[0];
			var type = require(path.join(dir, filename));
			types[name] = type;
		});
	});

	return types;
})();

exports.insert = function(type, ids, object) {}
exports.upsert = function(type, ids, object) {}
exports.update = function(type, ids, object) {}
exports.delete = function(type, ids) {}

exports.ping = function() {
	console.log("data", JSON.stringify(data));
	console.log("types", JSON.stringify(types));
}
