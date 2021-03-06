import axios from "axios";
import {
  ON_VOTE,
  UPDATE_VOTED_ASK,
  SAVE_FETCHED_INITIAL_ASKS,
  SAVE_FETCHED_NEXT_ASKS,
  UPDATE_INITIAL_4_ASKS,
  SAVE_VOTE_START,
  SAVE_VOTE_DONE,
  SAVE_VOTE_ERROR,
  ON_NEXT_ASK,
  ON_NEWEST_ASKS,
  ON_POPULAR_ASKS,
  ON_CONTROVERSIAL_ASKS,
  UPDATE_TOTAL_USER_VOTES,
  RUNNING_ATHENA_FOR_USER_START,
  RUNNING_ATHENA_FOR_USER_DONE,
  RUNNING_ATHENA_FOR_USER_ERROR,
  NEW_UNSEEN_MATCH
} from "../types";
import { MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH } from "../../utils/constants";
import { saveAndAddNeurons } from "./ask";
import { NUMBER_NEURONS_GIVEN_FOR_VOTE_IN_BILLIONS } from "../../containers/payment/prices";

export const onNewestAsks = colorTheme => dispatch => {
  dispatch({
    type: ON_NEWEST_ASKS
  });
};

export const onPopularAsks = colorTheme => dispatch => {
  dispatch({
    type: ON_POPULAR_ASKS
  });
};

export const onControversialAsks = colorTheme => dispatch => {
  dispatch({
    type: ON_CONTROVERSIAL_ASKS
  });
};

export const onVote = (
  answerIndex,
  answerId,
  askIndex,
  askId,
  history,
  mongoDBUserId,
  ranInitialMinerva,
  totalUserVotes,
  filledInterests
) => async dispatch => {
  dispatch({ type: SAVE_VOTE_START, saveIndex: askIndex });
  dispatch({
    type: ON_VOTE,
    answerIndex: answerIndex,
    askIndex: askIndex
  });

  const voteInfo = {
    answerId: answerId,
    askId: askId
  };
  const response = await axios.put("/api/sorting_hat/vote", voteInfo);
  //response.data === askInDB
  dispatch({
    type: UPDATE_VOTED_ASK,
    askIndex: askIndex,
    newAsk: response.data
  });

  if (response.status === 200) {
    dispatch({ type: SAVE_VOTE_DONE, saveIndex: askIndex });
    saveAndAddNeurons(
      mongoDBUserId,
      dispatch,
      NUMBER_NEURONS_GIVEN_FOR_VOTE_IN_BILLIONS
    );
  } else {
    dispatch({ type: SAVE_VOTE_ERROR, saveIndex: askIndex });
  }

  // for running athena
  dispatch({
    type: UPDATE_TOTAL_USER_VOTES,
    additionalVotes: 1
  });

  // subtract 1 from MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH because not counting current vote
  if (
    !ranInitialMinerva &&
    totalUserVotes >= MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH - 1 &&
    filledInterests
  ) {
    runAthena(dispatch);
  }
};

export const runAthena = async dispatch => {
  dispatch({
    type: RUNNING_ATHENA_FOR_USER_START
  });

  // runs athena and puts new user matches into DB
  const initialMatchesResponse = await axios.post("/api/matches/initial");

  if (initialMatchesResponse.status === 200) {
    // don't need to retrieve user matches here because redirected to
    // matches page where fetchUserMatches is always called
    // the numberOfUnseenMatches is also updated in auth
    dispatch({
      type: RUNNING_ATHENA_FOR_USER_DONE
    });

    // update match badge icon
    dispatch({
      type: NEW_UNSEEN_MATCH,
      numberOfUnseenMatchesToAdd: 2
    });
  } else {
    dispatch({
      type: RUNNING_ATHENA_FOR_USER_ERROR
    });
  }
};

export const fetchUserSortingHatAsks = mongoDBUserId => async dispatch => {
  const nextAsks = await axios.get(
    "/api/sorting_hat/initial_asks?mongoDBUserId=" + mongoDBUserId
  );
  dispatch({
    type: SAVE_FETCHED_INITIAL_ASKS,
    nextAsks: nextAsks
  });
  dispatch({
    type: UPDATE_INITIAL_4_ASKS
  });
};

export const onNextAsk = (
  nextAsks,
  removeAskIndex,
  mongoDBUserId
) => async dispatch => {
  if (nextAsks.length < 1) {
    const newNextAsks = await axios.get(
      "/api/sorting_hat/next_asks?mongoDBUserId=" + mongoDBUserId
    );
    dispatch({
      type: SAVE_FETCHED_NEXT_ASKS,
      nextAsks: newNextAsks
    });
    dispatch({
      type: ON_NEXT_ASK,
      removeAskIndex: removeAskIndex
    });
  } else {
    dispatch({
      type: ON_NEXT_ASK,
      removeAskIndex: removeAskIndex
    });
  }
};
