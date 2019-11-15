export const SET_GAME_STATUS = 'SET_GAME_STATUS';
export const ADD_PLAYER = 'ADD_PLAYER';
export const SET_MOVE = 'SET_MOVE';
export const SET_WINNER = 'SET_WINNER';
export const RESET_MOVES = 'RESET_MOVES';

export const setGameStatus = (gameState) => ({ type: SET_GAME_STATUS, gameState });
export const addPlayer = (playerId) => ({ type: ADD_PLAYER, playerId });
export const setMove = (playerId, move) => ({ type: SET_MOVE, playerId, move });
export const setWinner = (playerId) => ({ type: SET_WINNER, playerId });
export const resetMoves = () => ({ type: RESET_MOVES });