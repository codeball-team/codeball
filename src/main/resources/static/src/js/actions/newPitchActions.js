import request from 'superagent';
import { ajax, safeGet } from 'utils';
import { push } from 'react-router-redux';
import {
  NEW_PITCH_CHANGE_ADDRESS, NEW_PITCH_CHANGE_MIN_NUMBER_OF_PLAYERS,
  NEW_PITCH_CHANGE_MAX_NUMBER_OF_PLAYERS, NEW_PITCH_CHANGE_NAME,
  NEW_PITCH_RESET,
  NEW_PITCH_SUBMIT, NEW_PITCH_SUBMIT_FAILURE, NEW_PITCH_SUBMIT_SUCCESS
} from 'constants/actionTypes';
import { pitchAdminUrl } from 'constants';
import { NewPitchModel } from 'models';

export function newPitchChangeAddress(address) {
  return {
    type: NEW_PITCH_CHANGE_ADDRESS,
    address
  };
}

export function newPitchChangeMinNumberOfPlayers(minNumberOfPlayers) {
  return {
    type: NEW_PITCH_CHANGE_MIN_NUMBER_OF_PLAYERS,
    minNumberOfPlayers
  };
}

export function newPitchChangeMaxNumberOfPlayers(maxNumberOfPlayers) {
  return {
    type: NEW_PITCH_CHANGE_MAX_NUMBER_OF_PLAYERS,
    maxNumberOfPlayers
  };
}

export function newPitchChangeName(name) {
  return {
    type: NEW_PITCH_CHANGE_NAME,
    name
  };
}

export function newPitchReset() {
  return {
    type: NEW_PITCH_RESET
  };
}

export function newPitchSubmit(newGame) {
  const data = NewPitchModel.toServerFormat(newGame);
  return ajax(dispatch => ({
    request: request('POST', pitchAdminUrl())
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(data)),
    startAction: NEW_PITCH_SUBMIT,
    successAction: NEW_PITCH_SUBMIT_SUCCESS,
    failureAction: NEW_PITCH_SUBMIT_FAILURE,
    successCallback: response => {
      const pitchId = safeGet(response, ['body', 'id']);
      dispatch(push(`/pitches/${pitchId}`));
    }
  }));
}
