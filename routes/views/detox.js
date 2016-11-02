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

	// Render the view
	view.render('detox');
};
