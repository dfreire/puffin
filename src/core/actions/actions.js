var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var templates = require('../templates');

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

var data = (function() {
	var data = {};

	var dir = path.join(__dirname, '..', '..', '..', 'data');

	_.each(fs.readdirSync(dir), function(filename) {
		data = _.extend(data, require(path.join(dir, filename)));
	});

	return data;
})();

exports.insert = function(type, ids, object) {}
exports.upsert = function(type, ids, object) {}
exports.update = function(type, ids, object) {}
exports.delete = function(type, ids) {}

exports.publish = function() {
	var page = 'home';
	var dir = path.join(__dirname, '..', '..', 'app', 'templates');
	var filename = path.join(dir, page + '.js');
	var template = require(filename);
	template.render(data.site.site, data.page[page]);
}
