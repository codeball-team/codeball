import request from 'superagent';
import { ajax } from 'utils';
import { push } from 'react-router-redux';
import {
  GAME_CHANGE_ENROLLMENT_STATUS, GAME_CHANGE_ENROLLMENT_STATUS_FAILURE, GAME_CHANGE_ENROLLMENT_STATUS_SUCCESS,
  GAME_CLOSE_ENROLLMENT, GAME_CLOSE_ENROLLMENT_FAILURE, GAME_CLOSE_ENROLLMENT_SUCCESS,
  GAME_DRAW_TEAMS, GAME_DRAW_TEAMS_FAILURE, GAME_DRAW_TEAMS_SUCCESS,
  GAME_EDIT, GAME_EDIT_CANCEL, GAME_EDIT_SCORE_A, GAME_EDIT_SCORE_B,
  GAME_END, GAME_END_FAILURE, GAME_END_SUCCESS,
  GAME_LOAD, GAME_LOAD_FAILURE, GAME_LOAD_SUCCESS,
  GAME_SAVE, GAME_SAVE_FAILURE, GAME_SAVE_SUCCESS,
  GAMES_LOAD, GAMES_LOAD_FAILURE, GAMES_LOAD_SUCCESS
} from 'constants/actionTypes';
import {
  gameAdminUrl,
  gameDrawTeamsUrl,
  gameEnrollmentUrl,
  gameUrl,
  gamesUrl
} from 'constants';

export function gameChangeEnrollmentStatus(gameId, userId, enrollmentStatus) {
  return ajax(() => ({
    request: request('PUT', gameUrl(gameId))
      .set('Content-Type', 'application/json')
      .send(`"${enrollmentStatus}"`),
    startAction: GAME_CHANGE_ENROLLMENT_STATUS,
    successAction: GAME_CHANGE_ENROLLMENT_STATUS_SUCCESS,
    failureAction: GAME_CHANGE_ENROLLMENT_STATUS_FAILURE,
    params: {
      gameId,
      userId,
      enrollmentStatus
    }
  }));
}

export function gameCloseEnrollment(gameId) {
  return ajax(() => ({
    request: request('PUT', gameEnrollmentUrl(gameId))
      .set('Content-Type', 'application/json'),
    startAction: GAME_CLOSE_ENROLLMENT,
    successAction: GAME_CLOSE_ENROLLMENT_SUCCESS,
    failureAction: GAME_CLOSE_ENROLLMENT_FAILURE,
    params: {
      gameId
    }
  }));
}

export function gameDrawTeams(gameId) {
  return ajax(() => ({
    request: request('PUT', gameDrawTeamsUrl(gameId))
      .set('Content-Type', 'application/json'),
    startAction: GAME_DRAW_TEAMS,
    successAction: GAME_DRAW_TEAMS_SUCCESS,
    failureAction: GAME_DRAW_TEAMS_FAILURE,
    params: {
      gameId
    }
  }));
}

export function gameEdit() {
  return {
    type: GAME_EDIT
  };
}

export function gameEditCancel() {
  return {
    type: GAME_EDIT_CANCEL
  };
}

export function gameEditScoreA(teamAScore) {
  return {
    type: GAME_EDIT_SCORE_A,
    teamAScore
  };
}

export function gameEditScoreB(teamBScore) {
  return {
    type: GAME_EDIT_SCORE_B,
    teamBScore
  };
}

export function gameEnd(gameId) {
  return ajax(dispatch => ({
    request: request('PUT', gameAdminUrl(gameId))
      .set('Content-Type', 'application/json')
      .send({ isGameOver: true }),
    startAction: GAME_END,
    successAction: GAME_END_SUCCESS,
    failureAction: GAME_END_FAILURE,
    successCallback: () => {
      dispatch(push(`/games/previous/${gameId}`));
    },
    params: {
      gameId
    }
  }));
}

export function gameLoad(gameId) {
  return ajax(() => ({
    request: request('GET', gameUrl(gameId))
      .set('Content-Type', 'application/json'),
    startAction: GAME_LOAD,
    successAction: GAME_LOAD_SUCCESS,
    failureAction: GAME_LOAD_FAILURE,
    params: {
      gameId
    }
  }));
}

export function gameSave(gameId, data) {
  return ajax(() => ({
    request: request('PUT', gameUrl(gameId))
      .set('Content-Type', 'application/json')
      .send(data),
    startAction: GAME_SAVE,
    successAction: GAME_SAVE_SUCCESS,
    failureAction: GAME_SAVE_FAILURE
  }));
}

export function gamesLoad() {
  return ajax(() => ({
    request: request('GET', gamesUrl())
      .set('Content-Type', 'application/json'),
    startAction: GAMES_LOAD,
    successAction: GAMES_LOAD_SUCCESS,
    failureAction: GAMES_LOAD_FAILURE
  }));
}
