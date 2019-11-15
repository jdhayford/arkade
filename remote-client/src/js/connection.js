import io from 'socket.io-client';
import * as Actions from './store/actions';

// const API_BASE = 'localhost:3000';
const API_BASE = 'http://api.arkade.ngrok.io';

class Connection {
  init(store) {
    this.store = store;
    this.io = io(API_BASE);
    
    this.io.on('connect', () => {
      const { gameId, playerId } = this.store.getState();
      console.log(`Connected: Game ${gameId} | Player ${playerId}`)
      this.io.emit('join_game', gameId, playerId);
      this.registerHandlers();
    });
  }

  registerHandlers() {
    this.io.on('message', (msg) => {
      console.log(msg)
    });

    this.io.on('new_game_state', (state) => {
      const { playerId } =  this.store.getState()
      const { players, status } = state;
      const player = players[playerId];

      // Only update state if one of players
      if (player) {
        store.dispatch(Actions.setPlayers(players))
        store.dispatch(Actions.setStatus(status))
      }
    });

    this.io.on('disconnect', (e) => {
      console.log(e)
    });
  }

  makeMove(move) {
    const { gameId, playerId } =  this.store.getState()
    this.io.emit('new_move', gameId, playerId, move);
  }
}

export default new Connection();