// App.js
export const UPDATE_COLOR_THEME = 'UPDATE_COLOR_THEME';
export const SAVE_FETCHED_USER_AUTH = 'SAVE_FETCHED_USER_AUTH';
export const SAVE_FETCHED_USER_PROFILE = 'SAVE_FETCHED_USER_PROFILE';
export const UPDATE_LOGGED_IN_STATE = 'UPDATE_LOGGED_IN_STATE';
export const UPDATE_OUR_SOCKET_ID = 'UPDATE_OUR_SOCKET_ID';

// CustomHeader.js
export const MOVE_TO_PROFILE = 'MOVE_TO_PROFILE';
export const MOVE_TO_TRAIN_AI = 'MOVE_TO_TRAIN_AI';
export const MOVE_TO_MATCHES = 'MOVE_TO_MATCHES';
export const MOVE_TO_SIGNED_IN_LANDING = 'MOVE_TO_SIGNED_IN_LANDING';

// profile/ProfileEdit.js
export const ON_CHANGE_NAME = 'ON_CHANGE_NAME';
export const ON_CHANGE_AGE = 'ON_CHANGE_AGE';
export const ON_CHANGE_INTERESTS = 'ON_CHANGE_INTERESTS';
export const ON_CHANGE_TIME_ZONE = 'ON_CHANGE_TIME_ZONE';
export const ON_CHANGE_TIME_SLOT = 'ON_CHANGE_TIME_SLOT';
export const SAVE_PROFILE_START = 'SAVE_PROFILE_START';
export const SAVE_PROFILE_DONE = 'SAVE_PROFILE_DONE';
export const SAVE_PROFILE_ERROR = 'SAVE_PROFILE_ERROR';

// train_ai/Ask.js
export const ON_CHANGE_QUESTION = 'ON_CHANGE_QUESTION';
export const ON_CLICK_ADD_ANSWER = 'ON_CLICK_ADD_ANSWER';
export const ON_CHANGE_ANSWER = 'ON_CHANGE_ANSWER';
export const SAVE_QUESTION_START = 'SAVE_QUESTION_START';
export const SAVE_QUESTION_DONE = 'SAVE_QUESTION_DONE';
export const SAVE_QUESTION_ERROR = 'SAVE_QUESTION_ERROR';

// train_ai/InputVote.js
export const SAVE_FETCHED_INITIAL_ASKS = 'SAVE_FETCHED_INITIAL_ASKS';
export const SAVE_FETCHED_NEXT_ASKS = 'SAVE_FETCHED_NEXT_ASKS';
export const UPDATE_INITIAL_4_ASKS = 'UPDATE_INITIAL_4_ASKS';
export const ON_VOTE = 'ON_VOTE';
export const UPDATE_VOTED_ASK = 'UPDATE_VOTED_ASK';
export const SAVE_VOTE_START = 'SAVE_VOTE_START';
export const SAVE_VOTE_DONE = 'SAVE_VOTE_DONE';
export const SAVE_VOTE_ERROR = 'SAVE_VOTE_ERROR';
export const ON_NEXT_QUESTION = 'ON_NEXT_QUESTION';
export const ON_NEXT_ASK = 'ON_NEXT_ASK';

// matches/Matches.js
export const SAVE_FETCHED_DAILY_MATCHES = 'SAVE_FETCHED_DAILY_MATCHES';
export const UPDATE_INITIAL_MATCH = 'UPDATE_INITIAL_MATCH';
export const ON_NEXT_MATCH = 'ON_NEXT_MATCH';
export const MOVE_TO_CONVERSATIONS = 'MOVE_TO_CONVERSATIONS';
export const UPDATE_CONTACTS = '	UPDATE_CONTACTS';
export const UPDATE_CONTACTS_ERROR = 'UPDATE_CONTACTS_ERROR ';
export const DELETE_MATCH_IN_DB = 'DELETE_MATCH_IN_DB';
export const DELETE_MATCH_IN_DB_ERROR = 'DELETE_MATCH_IN_DB_ERROR';

// conversations/Chat.js
export const UPDATE_CHAT = 'UPDATE_CHAT';
export const UPDATE_CHAT_ERROR = 'UPDATE_CHAT_ERROR';
export const SET_CHAT_LOADING = 'SET_CHAT_LOADING';
export const SET_CHAT_HAS_MORE = 'SET_CHAT_HAS_MORE';
export const DISPLAY_MORE_MESSAGES = 'DISPLAY_MORE_MESSAGES';
export const ON_CHANGE_CURRENT_MESSAGE = 'ON_CHANGE_CURRENT_MESSAGE';
export const DISPLAY_SENT_MESSAGE = 'DISPLAY_SENT_MESSAGE';
export const MESSAGE_SENT_SUCCESS = 'MESSAGE_SENT_SUCCESS';
export const MESSAGE_SENT_ERROR = 'MESSAGE_SENT_ERROR';
export const DISPLAY_RECEIVED_MESSAGE = 'DISPLAY_RECEIVED_MESSAGE';

// conversations/Contacts.js
export const SET_LOADING = 'SET_LOADING';
export const SET_HAS_MORE = 'SET_HAS_MORE';
export const DISPLAY_MORE_CONTACTS = 'DISPLAY_MORE_CONTACTS';
export const ON_SELECT_CONTACT = 'ON_SELECT_CONTACT';
export const TOLD_DB_CLIENT_IN_CONVERSATION = 'TOLD_DB_CLIENT_IN_CONVERSATION';
export const TOLD_DB_CLIENT_IN_CONVERSATION_ERROR =
	'TOLD_DB_CLIENT_IN_CONVERSATION_ERROR';
export const SAVE_USER_CONVERSATIONS_SUCCESS =
	'SAVE_USER_CONVERSATIONS_SUCCESS';
export const SAVE_USER_CONVERSATIONS_ERROR = 'SAVE_USER_CONVERSATIONS_ERROR';
export const UPDATE_CONTACT_SOCKET_ID = 'UPDATE_CONTACT_SOCKET_ID';
