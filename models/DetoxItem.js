/**
 * Created by Alejandro on 30/10/2016.
 */
/**
 * Created by Alejandro on 30/10/2016.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

var DetoxItem = new keystone.List('DetoxItem', {
	autokey: {path: 'slug', from: 'name', unique: true},
	map: {name: 'name'},
	defaultSort: '-createdAt'
});

DetoxItem.add({
	name: {type: String, required: true},
	createdAt: {type: Date, default: Date.now},
	description: {type: String},
	properties: {type: String},
	image: {type: Types.CloudinaryImage},
	image_ing: {type: Types.CloudinaryImage},
	program: {type: Types.Relationship, ref: 'Program'}
});

DetoxItem.defaultColumns = 'name, createdAt, description, image, program';
DetoxItem.register();
