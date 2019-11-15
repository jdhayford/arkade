import eventlet
import socketio

sio = socketio.Server(async_mode='eventlet', cors_allowed_origins='*')
app = socketio.WSGIApp(sio)


@sio.event
def connect(sid, data):
    print('connect ', sid)

@sio.event
def create_game(sid, game_id):
    game_room = f'game-{game_id}'
    print('create_game', sid, game_room)
    sio.enter_room(sid, game_room)

@sio.event
def join_game(sid, game_id, player_id):
    game_room = f'game-{game_id}'
    print('join_game', sid, game_room, player_id)
    sio.enter_room(sid, game_room)
    sio.emit('new_player', player_id, room=game_room)

@sio.event
def update_state(sid, game_id, game_state):
    game_room = f'game-{game_id}'
    sio.emit('new_game_state', game_state, room=game_room, skip_sid=sid)

@sio.event
def new_move(sid, game_id, player_id, move):
    game_room = f'game-{game_id}'
    print('new move', game_room, player_id, move)
    data = {
        'player_id': player_id,
        'move': move
    }
    sio.emit('new_move', data, room=game_room, skip_sid=sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 3000)), app, debug=True)