var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');

var templates = (function() {
	var templates = {};

	var dirs = [
		path.join(__dirname, '..', '..', 'core', 'templates'),
		path.join(__dirname, '..', '..', 'app', 'templates')
	];

	_.each(dirs, function(dir) {
		_.each(fs.readdirSync(dir), function(filename) {
			if (filename.endsWith(".hbs")); {
				var name = filename.split(".hbs")[0];
				var source = fs.readFileSync(path.join(__dirname, filename), 'utf-8');
				templates[name] = handlebars.compile(source);
			}
		});
	});

	return templates;
})();

exports.render = function(site, page) {
	var template = (_.isFunction(templates[name])) ? templates[name] : templates['default'];
	var context = {
		site: site,
		page: page
	};
	var html = template(context);
	console.log(html);
}
