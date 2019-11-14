import io from 'socket.io-client';

const API_BASE = 'localhost:3000';

class Connection {
  init(store) {
    this.store = store;
    this.io = io(API_BASE);
    
    this.io.on('connect', () => {
      const { gameId, playerId } = this.store.getState();
      console.log(`Connected: Game ${gameId} | Player ${playerId}`)
      // this.io.emit('join', { type: 'NEW_PLAYER', playerId });
      this.io.emit('join_game', gameId);
      // this.io.send('join_game', { type: 'NEW_PLAYER', playerId });
      // this.io.send('join', { type: 'NEW_PLAYER', playerId });
      this.registerHandlers();
    });
  }

  registerHandlers() {
    this.io.on('message', (msg) => {
      console.log(msg)
    });

    this.io.on('new_player', (e) => {
      console.log(e)
    });
  }
}

export default new Connection();