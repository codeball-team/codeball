import request from 'superagent';
import { ajax } from 'utils';
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from 'constants/ActionTypes';

export function loadUsers() {
  return ajax(
    request('GET', 'http://localhost:8080/api/users'),
    LOAD_USERS,
    LOAD_USERS_SUCCESS,
    LOAD_USERS_FAILURE
  );
}

