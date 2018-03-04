const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Ask = mongoose.model('asks');

module.exports = app => {
	app.post('/api/ask', requireLogin, async (request, response) => {
		const { newQuestion, newAnswers } = request.body;

		const answers = _.map(newAnswers, answer => {
			return {
				answer: answer,
				votes: 0
			};
		});

		const ask = new Ask({
			question: newQuestion,
			totalVotes: 0,
			answers: answers,
			_userId: request.user.id,
			dateAsked: Date.now(),
			lastVotedOn: Date.now()
		});
		console.log('ask = ', ask);
		try {
			await ask.save();
			console.log('saved ask!!!!!');
			request.user.asks.questions.push(newQuestion);
			//
			//saves document ask in collection asks
			const user = await request.user.save();
			response.send(user);
		} catch (error) {
			response.status(422).send(error);
		}
	});
};
