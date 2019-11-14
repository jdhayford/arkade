import io from 'socket.io-client';
import * as Actions from './store/actions';
import { getStatus } from './store/selectors';

const API_BASE = 'localhost:3000';
// const API_BASE = 'http://api.arkade.ngrok.io';

class Connection {
  init(store) {
    this.store = store;
    this.io = io(API_BASE);
    
    this.io.on('connect', () => {
      const { gameId } = this.store.getState();
      console.log(`Connected: Game ${gameId}`)
      this.io.emit('create_game', gameId);
      this.registerHandlers();
    });
  }

  registerHandlers() {
    this.io.on('new_player', (playerId) => {
      this.store.dispatch(Actions.addPlayer(playerId));
    });

    this.io.on('new_move', ({ player_id, move }) => {
      console.log(player_id)
      this.store.dispatch(Actions.setMove(player_id, move));
    });

    this.io.on('disconnect', (e) => {
      console.log(e)
    });

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const gameState = {
        status: getStatus(state),
        ...state,
      };
      console.log(gameState)
      this.io.emit('update_state', state.gameId, gameState);
    });
  }
}

export default new Connection();