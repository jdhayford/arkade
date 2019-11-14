
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import { D_GRAY, DARK_SLATE, WHITE } from '../utils/Colors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 2rem;
  margin-top: 5vh;
  color: ${WHITE};

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${(props) => props.small && `
    font-size: 1.5rem;
  `}}
`;

const QRWrapper = styled.div`
  align-self: center;
  background-color: ${WHITE};
  border-radius: 0.25rem;
  padding: 0.7rem 0.7rem 0.3rem;
  margin: 1rem;
`;

const Landing = ({ status, gameId, playerId, players }) => {
  // You are not in the game
  // You are in the game, waiting for another
  const isInGame = !!players[playerId];
  console.log(players)
  const prompt = isInGame ? 'Waiting for another player' : 'Game currently full';
  return (
    <Wrapper>
      <Row>Welcome</Row>
      <Row>Game:{gameId} | Player:{playerId}</Row>
      <Row>{prompt}</Row>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  status: state.status,
  gameId: state.gameId,
  playerId: state.playerId,
  players: state.players,
});

export default connect(mapStateToProps)(Landing);
