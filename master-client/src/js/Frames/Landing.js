
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { getStatus } from '../store/selectors';

import { D_GRAY, DARK_SLATE, WHITE } from '../utils/Colors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 6rem;
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
    font-size: 4.5rem;
  `}}
`;

const QRWrapper = styled.div`
  align-self: center;
  background-color: ${WHITE};
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 20vh;
`;

console.log(process.env.REMOTE_HOST)
const BASE_HOST = process.env.REMOTE_HOST || 'localhost'
const BASE = `${BASE_HOST}:5001`;
// const BASE = 'arkade.ngrok.io';
// const BASE = 'http://ixn-arkade.s3-website-us-east-1.amazonaws.com';

const Landing = ({ gameId, status }) => {
  const gameUrl = `${BASE}/?id=${gameId}`
  console.log(gameUrl)
  let prompt = 'Default prompt';
  if (status === 'SLEEPING') prompt = '^ Scan to Start ^';
  else if (status === 'JOINING') prompt = 'Waiting for one more...';
  return (
    <Wrapper>
      <Row>Rock,</Row>
      <Row>Paper,</Row>
      <Row>Scissors</Row>
      <QRWrapper>
        <a href={gameUrl}>
          <QRCode size={500} value={gameUrl} />
        </a>
      </QRWrapper>
      <Row small>{prompt}</Row>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  status: getStatus(state),
  gameId: state.gameId,
});

export default connect(mapStateToProps)(Landing);
