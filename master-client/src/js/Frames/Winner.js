
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

const WinnernWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 20rem 0;
  background-color: ${(props) => props.color};

  ${(props) => props.small && `
    font-size: 1.5rem;
  `}}
`;

const Move = styled.span`
  color: ${(props) => props.color};
  margin: 0 1rem;
`;

const Picking = ({ players }) => {
  const winner = Object.values(players).find(player => player.winner);
  const loser = Object.values(players).find(player => !player.winner);
  setTimeout(() => location.reload(), 5000)
  return (
    <Wrapper>
      <Row>
        <Move color={winner.color}>{winner.move}</Move> beats <Move color={loser.color}>{loser.move}</Move>
      </Row>
      <br />
      <Row>
        <WinnernWrapper color={winner.color}>
          Player {winner.id} wins!
        </WinnernWrapper>
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
