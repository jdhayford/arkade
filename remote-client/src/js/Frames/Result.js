
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import Connection from '../connection';

import { D_GRAY, DARK_SLATE, WHITE } from '../utils/Colors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 2rem;
  margin-top: 20vh;
  text-align: center;
  color: ${(props) => props.color};

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const COOL_ADJECTIVES = ['AWESOME', 'GLORIOUS', 'ILLUSTRIOUS', 'MAGNIFICENT'];
const COOL_NOUNS = ['CHAMPION', 'GENIUS', 'PSYCHIC', 'EXPERT'];

const BAD_ADJECTIVES = ['UNLUCKY', 'UNFORTUNATE', 'POOR', 'SORRY'];
const BAD_NOUNS = ['SOD', 'FOOL', 'AMATEUR', 'NOOB'];

const getRandom = (items) => items[Math.floor(Math.random()*items.length)];


const Result = ({ players, playerId }) => {
  const player = players[playerId];
  const isWinner = players[playerId].winner;
  const winningContent = `${getRandom(COOL_ADJECTIVES)} ${getRandom(COOL_NOUNS)}`;

  let losingContent = `${getRandom(BAD_ADJECTIVES)} ${getRandom(BAD_NOUNS)}`;
  if (Math.floor(Math.random()*10) < 3) {
    losingContent = 'THE WRONG SIDE OF A TERNARY OPEARATOR MY FRIEND';
  }
  return (
    <Wrapper color={player.color}>
      {isWinner ? 'WINNER!' : 'LOSER!'}
      <br />
      <br />
      {isWinner ? winningContent : losingContent}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  players: state.players,
  playerId: state.playerId,
});

export default connect(mapStateToProps)(Result);
