const _ = require("lodash");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Ask = mongoose.model("asks");

module.exports = app => {
  app.post("/api/ask", requireLogin, async (request, response) => {
    const { newQuestion, newAnswers } = request.body;

    const answers = _.map(newAnswers, answer => {
      return {
        answer: answer,
        votes: 0
      };
    });
    //console.log('answers = ', answers);
    const ask = new Ask({
      question: newQuestion,
      totalVotes: 0,
      answers: answers,
      _userId: request.user.id,
      dateAsked: Date.now(),
      lastVotedOn: Date.now()
    });

    try {
      await ask.save();
      request.user.profile.asks.questions.push({
        question: ask.question,
        _askId: ask._id
      });
      // console.log('ask = ', ask);
      // saves document ask in collection asks
      await request.user.save();
      response.send(ask);
    } catch (error) {
      response.status(422).send(error);
    }
  });
};
