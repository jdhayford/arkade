
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
  margin-top: 30vh;
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

const SelectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
  padding: 20rem 0;
  background-color: ${(props) => props.color};

  ${(props) => props.small && `
    font-size: 1.5rem;
  `}}
`;

const PlayerSelection = ({ player, move }) => {
  const color = player == 'RED' ? 'red' : 'blue';
  return move ? (
    <SelectionWrapper color={color}>
      READY
    </SelectionWrapper>
  ) : (
    <SelectionWrapper>
      WAITING
    </SelectionWrapper>
  );
}

const Picking = ({ gameState }) => {
  return (
    <Wrapper>
      <Row>CHOOSE WISELY</Row>
      <Row>
        <PlayerSelection player='RED' move={gameState.moves.RED} />
        <PlayerSelection player='BLUE' move={gameState.moves.BLUE} />
      </Row>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  gameState: state.gameState,
});

export default connect(mapStateToProps)(Picking);
