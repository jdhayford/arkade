import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as Actions from './actions';
import { Status } from '../services/fetchSessionStatus';

// const defaultGameState = {
//   status: 'SLEEPING',
// }

const defaultGameState = {
  status: 'SLEEPING',
  moves: {},
}

const url = new URL(location);
const urlParameters = new URLSearchParams(url.search);
const PLAYER_ID = Math.round(Math.random()*1000);
const GAME_ID = urlParameters.get('id');

const playerId = () => PLAYER_ID;
const gameId = () => GAME_ID;

export const players = (state = {}, action) => {
  switch (action.type) {
    case Actions.SET_PLAYERS: {
      return action.players;
    }
    default:
      return state;
  }
};

export const status = (state = 'SLEEPING', action) => {
  switch (action.type) {
    case Actions.SET_STATUS: {
      return action.status;
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
    status,
    players,
  });
