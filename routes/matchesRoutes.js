const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const ConversationCollection = mongoose.model("conversations");
const UserCollection = mongoose.model("users");
const amqp = require("amqplib/callback_api");
const keys = require("../config/keys");

const getUserInfo = async mongoDBMatchId => {
  const match = await UserCollection.findById(mongoDBMatchId);
  if (match !== null) {
    return {
      name: match.profile.name,
      age: match.profile.age,
      linkedInPublicProfileUrl: match.profile.linkedInPublicProfileUrl,
      githubPublicProfileUrl: match.profile.githubPublicProfileUrl,
      interests: match.profile.interests,
      timeZone: match.profile.timeZone,
      totalUserVotes: match.profile.asks.totalUserVotes,
      availability: match.profile.availability,
      asks: match.profile.asks,
      id: match._id,
      imageUrl: match.profile.imageUrl,
      completedCourses: match.profile.minerva.completedCourses
    };
  }
};

module.exports = app => {
  app.get("/api/matches", requireLogin, async (request, response) => {
    // formats the request string into an array
    const mongoDBUserId = request.user._id;
    // get user's Match Ids
    const userInDB = await UserCollection.findOne({ _id: mongoDBUserId });
    const userMatches = userInDB.matches;
    let matchesInfo = [];
    for (let match of userMatches) {
      let matchInfo = await getUserInfo(match.id);
      // completedCourses is just used for selected_contact_info
      delete matchInfo["completedCourses"];
      matchesInfo.push(matchInfo);
    }
    response.send(matchesInfo);
  });

  app.get(
    "/api/matches/selected_contact_info",
    requireLogin,
    async (request, response) => {
      const selectedMatchInfo = await getUserInfo(
        request.query.contactMongoDBId
      );
      response.send(selectedMatchInfo);
    }
  );

  app.post(
    "/api/matches/start_conversation",
    requireLogin,
    async (request, response) => {
      const { matchId, matchName } = request.body;

      const userId = request.user._id;
      const userName = request.user.profile.name;
      // sets new conversation document to conversation variable
      const conversation = new ConversationCollection({
        user1: { id: userId },
        user2: { id: matchId },
        last50Messages: []
      });

      // finds userConversationList && matchConversationList
      const userInDB = await UserCollection.findOne({ _id: userId });
      let userConversationList = userInDB.conversations.userConversations;
      // console.log('userConversationList = ', userConversationList);
      const matcOverpassB = await UserCollection.findOne({
        _id: matchId
      });
      let matchConversationList = matcOverpassB.conversations.userConversations;
      // console.log('matchConversationList = ', matchConversationList);

      try {
        const conversationInDB = await conversation.save();
        // console.log('conversationInDB = ', conversationInDB);
        userConversationList.unshift({
          conversationId: conversationInDB._id,
          matchName: matchName,
          matchId: matchId
        });
        await UserCollection.updateOne(
          { _id: userId },
          {
            $set: {
              "conversations.userConversations": userConversationList
            }
          },
          { upsert: true }
        );
        matchConversationList.unshift({
          conversationId: conversationInDB._id,
          matchName: userName,
          matchId: userId
        });

        await UserCollection.updateOne(
          { _id: matchId },
          {
            $set: {
              "conversations.userConversations": matchConversationList
            }
          },
          { upsert: true }
        );
        response.send("done");
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );

  app.put("/api/matches/seen", requireLogin, async (request, response) => {
    const { userId, matchId } = request.body;
    const userInDB = await UserCollection.findOne({ _id: userId });
    let userInDBMatches = userInDB.matches;
    for (let i = 0; i < userInDBMatches.length; i++) {
      if (String(userInDBMatches[i]["id"]) === matchId) {
        userInDBMatches[i]["seen"] = true;
      }
    }

    await UserCollection.updateOne(
      { _id: userId },
      { $set: { matches: userInDBMatches } }
    );

    response.send("done");
  });

  app.delete(
    "/api/matches/delete_match",
    requireLogin,
    async (request, response) => {
      const { matchId } = request.body;
      const userId = mongoose.Types.ObjectId(request.user._id);
      const matchMongoDBUserId = mongoose.Types.ObjectId(matchId);
      try {
        // https://stackoverflow.com/questions/16959099/how-to-remove-array-element-in-mongodb
        // deletes match from user's matches
        await UserCollection.update(
          { _id: userId },
          { $pull: { matches: { id: matchMongoDBUserId } } }
        );
        // deletes user from match's matches just in case both people get matched to each other
        await UserCollection.update(
          { _id: matchId },
          { $pull: { matches: { id: userId } } }
        );
        response.send("successful");
      } catch (error) {
        response.status(422).send(error);
      }
    }
  );

  app.post("/api/matches/initial", requireLogin, async (request, response) => {
    // send message to Athena server to run Athena
    // for a specific user
    const mongoDBUserId = request.user._id;
    const URL = "amqp://infinity2o:2134711@54.165.110.8:5672";
    await amqp.connect(
      URL,
      function(error, connection) {
        connection.createChannel(function(error, channel) {
          let sendToQueueName = "run_athena_for_new_user_queue";
          channel.assertQueue("", { exclusive: true }, function(
            error,
            replyToQueueObject
          ) {
            // generateUniqueUID
            const correlationId =
              Math.random().toString() +
              Math.random().toString() +
              Math.random().toString();

            console.log(
              " [x] Requesting Athena matches for mongoDBUserId=%s",
              mongoDBUserId
            );

            channel.consume(
              replyToQueueObject.queue,
              function(messageFromServer) {
                if (
                  messageFromServer.properties.correlationId == correlationId
                ) {
                  const mongoDBUserIdFromAthenaServer = messageFromServer.content.toString();
                  console.log(
                    " [.] Got messageFromServer=%s",
                    mongoDBUserIdFromAthenaServer
                  );

                  if (mongoDBUserIdFromAthenaServer !== null) {
                    response.send(mongoDBUserIdFromAthenaServer);
                  } else {
                    response
                      .status(422)
                      .send("ERROR: Athena ran unsuccessfully");
                  }
                  setTimeout(function() {
                    connection.close();
                  }, 500);
                }
              },
              { noAck: true }
            );

            const mongoDBUserId_serverEnvironment =
              mongoDBUserId + " " + keys.serverEnvironment;
            channel.sendToQueue(
              sendToQueueName,
              new Buffer(mongoDBUserId_serverEnvironment),
              {
                correlationId: correlationId,
                replyTo: replyToQueueObject.queue
              }
            );
          });
        });
      }
    );
  });
};
