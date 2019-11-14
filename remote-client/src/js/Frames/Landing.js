
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

const Landing = ({ status }) => {
  let prompt = 'Default prompt';
  if (status === 'SLEEPING') prompt = '^ Scan to Start ^';
  else if (status === 'JOINING') prompt = 'Waiting for one more...';
  return (
    <Wrapper>
      <Row>Rock,</Row>
      <Row>Paper,</Row>
      <Row>Scissors</Row>
      <QRWrapper>
        <QRCode value={'example.com'} />
      </QRWrapper>
      <Row small>{prompt}</Row>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  status: state.gameState.status,
});

export default connect(mapStateToProps)(Landing);
