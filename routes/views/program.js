var keystone = require('keystone');

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
		if(req.params.program) {
			var q = keystone.list('DetoxItem').model.find();

			keystone.list('Program').model.findOne({slug: locals.filters.program}).exec(function (err, result) {
				locals.data.program_obj = result;
				console.log(locals.data.program_obj);
				q.where('program', locals.data.program_obj.id).exec(function(err, results) {
					locals.data.items = results;
					next(err);
				});
			});

		}
	});
	
	// Render the view
	view.render('program');
};
