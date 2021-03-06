import axios from "axios";
import {
  SAVE_FETCHED_USER_AUTH,
  SAVE_FETCHED_USER_PROFILE,
  UPDATE_MATCHES_SEEN,
  UPDATE_CONTACT_WITH_NEW_USER_SOCKET_ID,
  TOLD_REDIS_CLIENT_IS_ONLINE,
  TOLD_REDIS_CLIENT_IS_ONLINE_ERROR,
  DISPLAY_RECEIVED_MESSAGE,
  NEW_MESSAGE,
  UPDATE_TOTAL_NUMBER_OF_UNSEEN_MESSAGES
} from "./types";
import { updateWithSavedColorTheme } from "./colorTheme";
import { store } from "../index";
import io from "socket.io-client";
import history from "../containers/history";
export let clientSocket;

function saveUserProfile(response, dispatch) {
  const lastRecordedSiteVisitDate =
    response.data.profile.minerva.lastRecordedSiteVisitDate;
  // for some reason, the date from mongoDB doesn't have the .getDate() function
  // so need to reset it as a Date data
  if (
    lastRecordedSiteVisitDate === undefined ||
    new Date(lastRecordedSiteVisitDate).getDate() !== new Date().getDate()
  ) {
    // no data on last time that user visited site or
    // haven't recorded today's visit to the site so need to update date
    axios.put("/api/profile/user_visited_site");
  }

  dispatch({
    type: SAVE_FETCHED_USER_PROFILE,
    profile: response.data.profile
  });

  // separate dispatch that goes to customHeader reducer
  let numberOfUnseenMatches = 0;
  for (let i = 0; i < response.data.matches.length; i++) {
    if (response.data.matches[i]["seen"] === false) {
      numberOfUnseenMatches += 1;
    }
  }
  dispatch({
    type: UPDATE_MATCHES_SEEN,
    numberOfUnseenMatches: numberOfUnseenMatches,
    basicMatchInfo: response.data.matches
  });
  dispatch({
    type: UPDATE_TOTAL_NUMBER_OF_UNSEEN_MESSAGES,
    totalNumberOfUnseenMessages:
      response.data.conversations.totalNumberOfUnseenMessages
  });
}

async function storeUserSocketIdInRedis(
  dispatch,
  mongoDBUserId,
  userConversations,
  clientSocketId
) {
  const info = {
    mongoDBUserId: mongoDBUserId,
    userConversations: userConversations,
    clientSocketId: clientSocketId
  };

  // puts user inside of redis and tells online contacts that user is online
  const clientIsOnlineResponse = await axios.post(
    "/api/conversations/user_online",
    info
  );

  if (clientIsOnlineResponse.status === 200) {
    dispatch({
      type: TOLD_REDIS_CLIENT_IS_ONLINE
    });
  } else {
    store.dispatch({ type: TOLD_REDIS_CLIENT_IS_ONLINE_ERROR });
  }
}

export const initializeApp = () => async dispatch => {
  const response = await axios.get("/api/current_user");
  dispatch({
    type: SAVE_FETCHED_USER_AUTH,
    auth: response.data.auth,
    mongoDBUserId: response.data._id
  });
  if (window.location.href.includes("profile")) {
    // on profile page, need to check if user is logged in
    if (response.data.auth === undefined) {
      // user not logged in, need to push to landing page
      history.push("/");
    }
  }
  if (response.data.auth !== undefined) {
    // user is logged in
    // console.log("window.location.href = ", window.location.href);
    // in production, staging, or development
    if (window.location.href.includes("infinity2o")) {
      // in production or staging
      clientSocket = io(process.env.REACT_APP_SOCKET_DOMAIN, {
        transports: ["websocket"]
      });
      if (window.location.href.includes("infinity2o-staging")) {
        // staging
        clientSocket = io(process.env.REACT_APP_SOCKET_DOMAIN_STAGING, {
          transports: ["websocket"]
        });
      }
      clientSocket.on("connect", () => {
        // https://stackoverflow.com/questions/44270239/how-to-get-socket-id-of-a-connection-on-client-side
        storeUserSocketIdInRedis(
          dispatch,
          response.data._id,
          response.data.conversations.userConversations,
          clientSocket.id
        );
      });

      // listen for when any contacts come online
      clientSocket.on("TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE", function(
        newUserSocketInfo
      ) {
        // console.log(
        // 	'TELL_CONTACT_X:ONE_OF_YOUR_CONTACTS_IS_ONLINE newUserSocketInfo = ',
        // 	newUserSocketInfo
        // );

        // telling an online contact the user's new clientSocket id
        dispatch({
          type: UPDATE_CONTACT_WITH_NEW_USER_SOCKET_ID,
          newUserSocketInfo: newUserSocketInfo
        });
      });

      clientSocket.on("TELL_CLIENT_B:MESSAGE_FROM_CLIENT_A", function(
        messageInfo
      ) {
        // No need to save message into DB since the message was already
        // saved by client A. We just need to display the message to us(Client B)
        // console.log(
        //   "TELL_CLIENT_B:MESSAGE_FROM_CLIENT_A messageInfo contacts = ",
        //   messageInfo
        // );

        const selectedContactMongoDBId = store.getState().contacts
          .selectedConversationInfo.selectedContactMongoDBInfo.id;
        // console.log("selectedContactMongoDBId = ", selectedContactMongoDBId);
        // the message should be displayed only if contact is selecting conversation with user
        if (messageInfo.senderId === selectedContactMongoDBId) {
          dispatch({
            type: DISPLAY_RECEIVED_MESSAGE,
            messageInfo: messageInfo
          });

          const conversationInfo = {
            contactMongoDBId: messageInfo.senderId
          };

          // seen the message so need to decrement totalNumberOfUnseenMessages
          // and numberOfUnseenMatches inside DB
          axios.put("/api/profile/seen_new_message", conversationInfo);
        } else {
          // increments the totalNumberOfUnseenMessages and the numberOfUnseenMessages
          dispatch({
            type: NEW_MESSAGE,
            senderId: messageInfo.senderId
          });
        }
      });
    } else {
      // in development
    }

    saveUserProfile(response, dispatch);
    updateWithSavedColorTheme(dispatch, response.data.profile.colorTheme);
  }
};
