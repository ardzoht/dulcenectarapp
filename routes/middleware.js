/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Detox', key: 'detox', href: '/gallery' },
		{ label: 'Nosotros', key: 'aboutus', href: '/aboutus', submenu: [
			{ label: '¿Quiénes somos?', key: 'whoarewe', href: '/aboutus' },
			{ label: '¿Qué es prensado en frío?', key: 'prensado_frio', href: '/coldpressed' },
			{ label: '¿Qué son los superfoods?', key: 'superfoods', href: '/superfoods' },
		] },
		{ label: 'Contacto', key: 'contact', href: '/contact' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'FAQ', key: 'faq', href: '/' }
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('exito'),
		warning: req.flash('aviso'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Registrate para acceder a esta página.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
