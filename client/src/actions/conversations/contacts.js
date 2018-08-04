import axios from "axios";
import {
	UPDATE_CONTACTS,
	UPDATE_CONTACTS_ERROR,
	UPDATE_CHAT,
	UPDATE_CHAT_ERROR,
	ON_SELECT_CONTACT,
	SAVE_USER_CONVERSATIONS_SUCCESS,
	SAVE_USER_CONVERSATIONS_ERROR,
	SEEN_MESSAGES,
	UPDATE_SELECTED_CONTACT_INFO,
	UPDATE_VOTE_COMPARISON
} from "../types";
import { store } from "../../index";

export const fetchConversations = () => async dispatch => {
	// 1) hit /api/current_user to get allContacts
	const userResponse = await axios.get("/api/current_user");
	if (userResponse.status === 200) {
		const userConversations = userResponse.data.conversations.userConversations;
		// 2) update user conversations with newest contact clientSocket ids
		const updatedUserConversationsResponse = await axios.put(
			"/api/conversations/online_contacts",
			userConversations
		);

		if (updatedUserConversationsResponse.status === 200) {
			const updatedUserConversations = updatedUserConversationsResponse.data;
			dispatch({
				type: UPDATE_CONTACTS,
				allContacts: updatedUserConversations
			});
			dispatch({ type: SAVE_USER_CONVERSATIONS_SUCCESS });

			const contactChatDisplayIndex = 0;
			// 3) display chat log of first conversation
			if (
				updatedUserConversations !== undefined &&
				updatedUserConversations.length >= 1
			) {
				const conversationId =
					updatedUserConversations[contactChatDisplayIndex].conversationId;
				const contactIsOnline =
					updatedUserConversations[contactChatDisplayIndex].isOnline;
				const contactSocketId =
					updatedUserConversations[contactChatDisplayIndex].socketId;
				const contactMongoDBUserId =
					updatedUserConversations[contactChatDisplayIndex].matchId;
				const numberOfUnseenMessages =
					updatedUserConversations[contactChatDisplayIndex]
						.numberOfUnseenMessages;

				selectContact(
					conversationId,
					contactIsOnline,
					contactSocketId,
					contactMongoDBUserId,
					numberOfUnseenMessages,
					dispatch
				);
			}
		} else {
			dispatch({ type: UPDATE_CONTACTS_ERROR });

			dispatch({ type: SAVE_USER_CONVERSATIONS_ERROR });
		}
	}
};

const selectContact = async (
	conversationId,
	contactIsOnline,
	contactSocketId,
	contactMongoDBUserId,
	numberOfUnseenMessages,
	dispatch
) => {
	dispatch({
		type: ON_SELECT_CONTACT,
		conversationId: conversationId,
		contactIsOnline: contactIsOnline,
		contactSocketId: contactSocketId,
		contactMongoDBUserId: contactMongoDBUserId
	});

	// get previous messages in DB
	const previousMessagesInDB = await axios.get(
		"/api/conversations?conversationId=" + conversationId
	);

	if (previousMessagesInDB.status === 200) {
		dispatch({
			type: UPDATE_CHAT,
			last50Messages: previousMessagesInDB.data.last50Messages
		});

		if (numberOfUnseenMessages >= 1) {
			dispatch({
				type: SEEN_MESSAGES,
				conversationId: conversationId,
				numberOfUnseenMessages: numberOfUnseenMessages
			});
			const seenMessagesInfo = {
				conversationId: conversationId,
				numberOfUnseenMessages: numberOfUnseenMessages
			};
			await axios.put("/api/profile/seen_messages", seenMessagesInfo);
		}
	} else {
		dispatch({ type: UPDATE_CHAT_ERROR });
	}

	const selectedContactInfo = await axios.get(
		"/api/matches/selected_contact_info?contactMongoDBUserId=" +
			contactMongoDBUserId
	);

	if (selectedContactInfo.status === 200) {
		// dispatch update selected contact info
		dispatch({
			type: UPDATE_SELECTED_CONTACT_INFO,
			selectedContactInfo: selectedContactInfo.data
		});
		voteComparison(selectedContactInfo.data.asks.votes, dispatch);
	}
};

const voteComparison = (contactVotes, dispatch) => {
	const userVotes = store.getState().profile.asks.votes;
	let userVoteDict = {};
	userVotes.forEach(userVote => {
		userVoteDict[userVote._askId] = {
			_answerId: userVote._answerId,
			question: userVote.question,
			selectedAnswer: userVote.selectedAnswer
		};
	});

	let agreedAsks = [];
	let disagreedAsks = [];
	contactVotes.forEach(contactVote => {
		if (userVoteDict[contactVote._askId] !== undefined) {
			// user and contact both answered this question
			if (
				userVoteDict[contactVote._askId]._answerId === contactVote._answerId
			) {
				// user and contact answered the same answer
				agreedAsks.push({
					question: contactVote.question,
					userAndContactAnswer: contactVote.selectedAnswer
				});
			} else {
				// user and contact answered differently
				disagreedAsks.push({
					question: contactVote.question,
					contactAnswer: contactVote.selectedAnswer,
					userAnswer: userVoteDict[contactVote._askId].selectedAnswer
				});
			}
		}
	});
	dispatch({
		type: UPDATE_VOTE_COMPARISON,
		agreedAsks: agreedAsks,
		disagreedAsks: disagreedAsks
	});
};

export const onSelectContact = (
	conversationId,
	contactIsOnline,
	contactSocketId,
	contactMongoDBUserId,
	numberOfUnseenMessages
) => async dispatch => {
	selectContact(
		conversationId,
		contactIsOnline,
		contactSocketId,
		contactMongoDBUserId,
		numberOfUnseenMessages,
		dispatch
	);
};
