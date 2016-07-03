import request from 'superagent';
import { ajax, safeGet } from 'utils';
import { push } from 'react-router-redux';
import {
  NEW_GAME_CHANGE_DATE, NEW_GAME_CHANGE_DURATION, NEW_GAME_CHANGE_HOUR,
  NEW_GAME_CHANGE_MINUTE, NEW_GAME_CHANGE_PITCH_ID, NEW_GAME_RESET,
  NEW_GAME_SUBMIT, NEW_GAME_SUBMIT_FAILURE, NEW_GAME_SUBMIT_SUCCESS
} from 'constants/actionTypes';
import { gameAdminUrl } from 'constants';
import { NewGameModel } from 'models';

export function newGameChangeDate(date) {
  return {
    type: NEW_GAME_CHANGE_DATE,
    date
  };
}

export function newGameChangeDuration(duration) {
  return {
    type: NEW_GAME_CHANGE_DURATION,
    duration
  };
}

export function newGameChangeHour(hour) {
  return {
    type: NEW_GAME_CHANGE_HOUR,
    hour
  };
}

export function newGameChangeMinute(minute) {
  return {
    type: NEW_GAME_CHANGE_MINUTE,
    minute
  };
}

export function newGameChangePitchId(pitchId) {
  return {
    type: NEW_GAME_CHANGE_PITCH_ID,
    pitchId
  };
}

export function newGameReset() {
  return {
    type: NEW_GAME_RESET
  };
}

export function newGameSubmit(newGame) {
  const data = NewGameModel.toServerFormat(newGame);
  return ajax(dispatch => ({
    request: request('POST', gameAdminUrl())
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(data)),
    startAction: NEW_GAME_SUBMIT,
    successAction: NEW_GAME_SUBMIT_SUCCESS,
    failureAction: NEW_GAME_SUBMIT_FAILURE,
    successCallback: response => {
      const gameId = safeGet(response, ['body', 'id']);
      dispatch(push(`/games/upcoming/${gameId}`));
    }
  }));
}
