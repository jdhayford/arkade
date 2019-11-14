
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
  margin-top: 5vh;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 30rem;
  height: 10rem;
  margin: 1rem 0;
  user-select: none;
  
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};

  ${(props) => props.selected && `
    background-color: ${props.color};
    color: ${WHITE};
  `}
`;


const Picking = ({ players, playerId }) => {
  const currentPlayer = players[playerId];
  console.log(players)
  return (
    <Wrapper>
      <br />
      <OptionsWrapper>
        {['ROCK', 'PAPER', 'SCISSORS'].map(option => (
          <Option
            color={currentPlayer.color}
            onClick={() => Connection.makeMove(option)}
            selected={currentPlayer.move == option}
            key={option}
          >
          {option}
        </Option>
        ))}
      </OptionsWrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  players: state.players,
  playerId: state.playerId,
});

export default connect(mapStateToProps)(Picking);
