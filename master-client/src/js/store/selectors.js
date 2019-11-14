export const getSession = (state) => state.session;
export const getSessionStatus = (state) => state.sessionStatus;
export const getStatus = (state) => {
  const { players } = state;
  if (Object.keys(players).length == 0) return 'SLEEPING'
  if (Object.keys(players).length < 2) return 'JOINING'
    
  const isWinner = Object.values(players).find(player => player.winner);
  const moves = Object.values(players).map(player => player.move).filter(move => !!move);
  if (isWinner) return 'SHOWING';
  if (moves.length <= 2) return 'PICKING';
  return 'DEFAULT';
}