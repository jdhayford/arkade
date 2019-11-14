
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import * as Actions from '../store/actions';

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

const PlayerSelection = ({ color, move }) => {
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

const moveMap = {
  ROCK: 'SCISSORS',
  PAPER: 'ROCK',
  SCISSORS: 'PAPER',
}

const getWinningMove = ([moveA, moveB]) => {
  if (moveA === moveB) return null;
  if (moveMap[moveA] === moveB) return moveA;
  else return moveB;
}

const pickWinner = (players) => {
  const moves = Object.values(players).map(player => player.move);
  const winningMove = getWinningMove(moves)
  if (!winningMove) throw new Error('TIE')

  const winningPlayer = Object.values(players).find(player => player.move === winningMove);
  return winningPlayer;
}

const Picking = ({ dispatch, players }) => {
  const [playerA, playerB] = Object.values(players);
  if (playerA.move && playerB.move) {
    // FOR SUSPENSE
    setTimeout(() => {
      const winner = pickWinner(players);
      dispatch(Actions.setWinner(winner.id));
    }, 1500);
  }

  return (
    <Wrapper>
      <Row>CHOOSE WISELY</Row>
      <br />
      <Row>
        <PlayerSelection color={playerA.color} move={playerA.move} />
        <PlayerSelection color={playerB.color} move={playerB.move} />
      </Row>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  players: state.players,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Picking);
