/**
 * Created by Alejandro on 30/10/2016.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

var Program = new keystone.List('Program', {
	autokey: {path: 'slug', from: 'name', unique: true},
	map: {name: 'name'},
	defaultSort: '-createdAt'
});

Program.add({
	name: {type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	description: {type: String},
	image: {type: Types.CloudinaryImage}
});
Program.relationship({ref: 'DetoxItem', path:'program' });
Program.defaultColumns = 'name, createdAt, description, image, items';
Program.register();
