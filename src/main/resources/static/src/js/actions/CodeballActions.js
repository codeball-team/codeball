import request from 'superagent';
import { ajax } from 'utils';
import {
  CHANGE_ENROLLMENT_STATUS, CHANGE_ENROLLMENT_STATUS_SUCCESS, CHANGE_ENROLLMENT_STATUS_FAILURE,
  LOAD_CURRENT_USER, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILURE,
  LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE,
  EDIT_GAME, CANCEL_EDIT_GAME, SAVE_GAME, SAVE_GAME_SUCCESS, SAVE_GAME_FAILURE,
  EDIT_GAME_SCORE_A, EDIT_GAME_SCORE_B,
  LOAD_GAMES, LOAD_GAMES_SUCCESS, LOAD_GAMES_FAILURE,
  LOAD_PITCHES, LOAD_PITCHES_SUCCESS, LOAD_PITCHES_FAILURE,
  LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE
} from 'constants/ActionTypes';
import {
  currentUserUrl,
  gameUrl,
  gamesUrl,
  pitchesUrl,
  usersUrl
} from 'constants/Api';

export function changeEnrollmentStatus(gameId, userId, enrollmentStatus) {
  return ajax({
    request: request('PUT', gameUrl(gameId))
      .set('Content-Type', 'application/json')
      .send(`"${enrollmentStatus}"`),
    startAction: CHANGE_ENROLLMENT_STATUS,
    successAction: CHANGE_ENROLLMENT_STATUS_SUCCESS,
    failureAction: CHANGE_ENROLLMENT_STATUS_FAILURE,
    params: {
      gameId,
      userId,
      enrollmentStatus
    }
  });
}

export function loadCurrentUser() {
  return ajax({
    request: request('GET', currentUserUrl()),
    startAction: LOAD_CURRENT_USER,
    successAction: LOAD_CURRENT_USER_SUCCESS,
    failureAction: LOAD_CURRENT_USER_FAILURE
  });
}

export function loadGame(gameId) {
  return ajax({
    request: request('GET', gameUrl(gameId)),
    startAction: LOAD_GAME,
    successAction: LOAD_GAME_SUCCESS,
    failureAction: LOAD_GAME_FAILURE,
    params: {
      gameId
    }
  });
}

export function editGame() {
  return {
    type: EDIT_GAME
  };
}

export function saveGame(gameId, data) {
  return ajax({
    request: request('PUT', gameUrl(gameId))
      .set('Content-Type', 'application/json')
      .send(data),
    startAction: SAVE_GAME,
    successAction: SAVE_GAME_SUCCESS,
    failureAction: SAVE_GAME_FAILURE
  });
}

export function cancelEditGame() {
  return {
    type: CANCEL_EDIT_GAME
  };
}

export function editGameScoreA(teamAScore) {
  return {
    type: EDIT_GAME_SCORE_A,
    teamAScore
  };
}

export function editGameScoreB(teamBScore) {
  return {
    type: EDIT_GAME_SCORE_B,
    teamBScore
  };
}

export function loadGames() {
  return ajax({
    request: request('GET', gamesUrl()),
    startAction: LOAD_GAMES,
    successAction: LOAD_GAMES_SUCCESS,
    failureAction: LOAD_GAMES_FAILURE
  });
}

export function loadPitches() {
  return ajax({
    request: request('GET', pitchesUrl()),
    startAction: LOAD_PITCHES,
    successAction: LOAD_PITCHES_SUCCESS,
    failureAction: LOAD_PITCHES_FAILURE
  });
}

export function loadUsers() {
  return ajax({
    request: request('GET', usersUrl()),
    startAction: LOAD_USERS,
    successAction: LOAD_USERS_SUCCESS,
    failureAction: LOAD_USERS_FAILURE
  });
}
