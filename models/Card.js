const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	name: String,
	context: String,
	createdDate: { type: Date, default: Date.now }
}, { _id : false });

const cardSchema = new mongoose.Schema({
	cardNo: {
		type: String,
		unique: true,
		default: undefined
	},
    title: String,
	context: String,
	status: String,
	email: String,
	comments: [ commentSchema ],
	createdBy: String,
	createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', cardSchema);