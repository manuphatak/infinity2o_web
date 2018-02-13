const mongoose = require('mongoose');
const { Schema } = mongoose; // = const Schema = mongoose.Schema;
//schema describes every property of a user
const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 },
	linkedInId: String,
	location: String,
	profile: {
		name: String,
		age: { type: Number },
		interests: [String],
		dateCreated: Date
	}
});

mongoose.model('users', userSchema);
//model class, user collection
