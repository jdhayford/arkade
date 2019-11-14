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

const url = new URL(location);
const urlParameters = new URLSearchParams(url.search);
const PLAYER_ID = Math.round(Math.random()*1000);
const GAME_ID = urlParameters.get('id');

const playerId = () => PLAYER_ID;
const gameId = () => GAME_ID;

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
    gameId,
    playerId,
    gameState,
  });
