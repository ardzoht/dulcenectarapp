/**
 * Created by Alejandro on 01/11/2016.
 */
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'detox';
	
	locals.data = {
		programs: [],
	};
	
	view.on('init', function(next) {
		console.log("hi");
		keystone.list('Program').model.find().sort('name').exec(function(err, results){
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.programs = results;
			console.log(results);
			next(err);
		})
	});

	// Render the view
	view.render('detox');
};
