import axios from 'axios';
import {
	SAVE_FETCHED_USER_AUTH,
	SAVE_FETCHED_USER_PROFILE,
	UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS
} from './types';
import { updateWithSavedColorTheme } from './colorTheme';
import { fetchUserSortingHatAsks } from './sorting_hat/sortingHat';
import { fetchUserMatches } from './matches/matches';
import { store } from '../index';

export const initializeApp = () => async dispatch => {
	const response = await axios.get('/api/current_user');

	dispatch({
		type: SAVE_FETCHED_USER_AUTH,
		auth: response.data.auth,
		mongoDBUserId: response.data._id
	});

	if (response.data._id !== undefined) {
		fetchUserSortingHatAsks(dispatch, response.data._id);

		if (response.data.matches.length >= 1) {
			fetchUserMatches(dispatch, response.data.matches);
		}
	}

	if (store.getState().auth.loggedInState === 'not_logged_in') {
		// use constant color theme
	} else if (store.getState().auth.loggedInState === 'logged_in') {
		updateWithSavedColorTheme(dispatch, response.data.profile.colorTheme);
	}
};

export const fetchUserProfile = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({
		type: SAVE_FETCHED_USER_PROFILE,
		profile: response.data.profile
	});

	if (
		response.data.profile !== undefined &&
		!store.getState().matches.hasUpdateTotalUserVotesFromDB
	) {
		dispatch({
			type: UPDATE_TOTAL_USER_VOTES_ACROSS_ALL_SESSIONS,
			additionalVotes: response.data.profile.asks.totalUserVotes
		});
	}
};
