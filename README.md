# arkade
PoC Rock, Paper, Scissors game that allows phones to join and function as controllers (via websockets)

### [Demo](https://s3.amazonaws.com/www.jdhayford.io/videos/quick-demo.mp4)

![Pic](https://s3.amazonaws.com/www.jdhayford.io/images/arkade-shot.png)

## Components
- master-client
- remote-client
- server

### master-client
This client (React) is meant to serve as the "screen" for the game. Starts with prompt (QR code) for a user to scan to "join".

### remote-cient
This client (React) that one arrives at upon "joining" the game, see above. This serves as the users remote control that they can use to make a selection.

### Server
The websocket server responsible for syncronizing game state between the clients.

## Running Locally

Everything is setup with docker so all you need to do is:

```
docker-compose up
```
