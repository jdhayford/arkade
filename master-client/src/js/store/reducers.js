import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as Actions from './actions';
import { Status } from '../services/fetchSessionStatus';

const url = new URL(location);
const urlParameters = new URLSearchParams(url.search);
const GAME_ID = urlParameters.get('id') || Math.random(Math.random()*10000);

const gameId = () => GAME_ID;

export const players = (state = {}, action) => {
  switch (action.type) {
    case Actions.ADD_PLAYER: {
      if (Object.keys(state).length < 2) {
        const color = Object.keys(state).length == 0 ? 'OrangeRed': 'DodgerBlue';
        return {
          [action.playerId]: {
            id: action.playerId,
            color,
            move: null,
            winner: null,
          },
          ...state,
        }
      }
      return state;
    }
    case Actions.SET_MOVE: {
      const player = state[action.playerId];
      return {
        ...state,
        [action.playerId]: {
          ...player,
          move: action.move,
        },
      };
    }
    case Actions.SET_WINNER: {
      const player = state[action.playerId];
      return {
        ...state,
        [action.playerId]: {
          ...player,
          winner: true,
        },
      };
    }
    default:
      return state;
  }
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    gameId,
    players,
  });
