import eventlet
import socketio

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)


@sio.event
def connect(sid, data):
    print('connect ', sid)

@sio.event
def join_game(sid, game_id):
    game_room = f'game-{game_id}'
    print('join_game', sid, game_room)
    sio.enter_room(sid, game_room)
    sio.emit('new_player', sid, room=game_room, skip_sid=sid)

@sio.event
def update_state(sid, game_id, game_state):
    game_room = f'game-{game_id}'
    sio.emit('new_game_state', game_state, room=game_room, skip_sid=sid)

@sio.event
def new_move(sid, game_id, player_id, move):
    game_room = f'game-{game_id}'
    sio.emit('new_move', game_state, room=game_room, skip_sid=sid)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 3000)), app, debug=True)