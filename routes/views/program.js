var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		program: req.params.program
	};
	locals.data = {
		items: []
	};

	view.on('init', function (next) {
		console.log(req.params.program);
		if(req.params.program) {
			var q = keystone.list('DetoxItem').model.find();

			keystone.list('Program').model.findOne({slug: locals.filters.program}).exec(function (err, result) {
				currProgram = result;
				q.where('program', currProgram.id).exec(function(err, results) {
					locals.data.items = results;
					console.log(locals.data.items);
				});
				next(err);
			});

		}
	});
	// Render the view
	view.render('program');
};
