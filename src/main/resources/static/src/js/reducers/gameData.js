import { ajaxReducer, ajaxReducerInitialState, safeGet, parseNumber } from 'utils';
import { GameModel } from 'models';
import {
  GAME_CHANGE_ENROLLMENT_STATUS_SUCCESS,
  GAME_CLOSE_ENROLLMENT_SUCCESS, GAME_DRAW_TEAMS_SUCCESS, GAME_EDIT,
  GAME_EDIT_CANCEL, GAME_EDIT_SCORE_A, GAME_EDIT_SCORE_B, GAME_END_SUCCESS,
  GAME_LOAD, GAME_LOAD_FAILURE, GAME_LOAD_SUCCESS,
  GAME_SAVE_FAILURE, GAME_SAVE_SUCCESS,
  NEW_GAME_SUBMIT, NEW_GAME_SUBMIT_FAILURE, NEW_GAME_SUBMIT_SUCCESS
} from 'constants/actionTypes';

const initialState = {
  ...ajaxReducerInitialState,
  isEditing: false,
  game: GameModel.example(),
  editedGame: {}
};

export default ajaxReducer(
  initialState,
  {
    startAction: GAME_LOAD,
    failureAction: GAME_LOAD_FAILURE,
    successAction: GAME_LOAD_SUCCESS
  },
  {
    [GAME_CHANGE_ENROLLMENT_STATUS_SUCCESS]: gameLoaded,

    [GAME_CLOSE_ENROLLMENT_SUCCESS]: gameLoaded,

    [GAME_DRAW_TEAMS_SUCCESS]: gameLoaded,

    [GAME_EDIT]: continueEditing,

    [GAME_EDIT_CANCEL]: state => ({
      ...state,
      editedGame: {},
      isEditing: false
    }),

    [GAME_EDIT_SCORE_A]: (state, action) => {
      const { teamAScore } = action;
      return {
        ...state,
        editedGame: {
          ...state.editedGame,
          teamAScore: parseNumber(teamAScore)
        }
      };
    },

    [GAME_EDIT_SCORE_B]: (state, action) => {
      const { teamBScore } = action;
      return {
        ...state,
        editedGame: {
          ...state.editedGame,
          teamBScore: parseNumber(teamBScore)
        }
      };
    },

    [GAME_END_SUCCESS]: gameLoaded,

    [GAME_LOAD_SUCCESS]: gameLoaded,

    [GAME_SAVE_FAILURE]: continueEditing,

    [GAME_SAVE_SUCCESS]: gameLoaded,

    [NEW_GAME_SUBMIT]: continueEditing,

    [NEW_GAME_SUBMIT_FAILURE]: continueEditing,

    [NEW_GAME_SUBMIT_SUCCESS]: gameLoaded
  }
);

function gameLoaded(state, action) {
  const responseGame = safeGet(action, ['response', 'body'], {});
  const game = GameModel.fromServerFormat(responseGame);
  return { ...initialState, game };
}

function continueEditing(state) {
  return { ...state, isEditing: true };
}
