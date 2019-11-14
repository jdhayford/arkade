import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as Actions from './actions';
import { Status } from '../services/fetchSessionStatus';

// const defaultGameState = {
//   status: 'SLEEPING',
// }

const defaultGameState = {
  status: 'PICKING',
  moves: {
    RED: null,
    BLUE: 'ROCK',
  },
}

export const gameState = (state = defaultGameState, action) => {
  switch (action.type) {
    case Actions.SET_GAME_STATE: {
      return action.gameState;
    }
    default:
      return state;
  }
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    gameState,
  });
