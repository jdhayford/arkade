import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import { getStatus } from '../store/selectors';
import Picking from './Picking';
import Winner from './Winner';
import { D_GRAY, DARK_SLATE } from '../utils/Colors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 1.5rem;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Content = styled.div`
  background-color: ${D_GRAY};
  min-height: calc(100vh);
  width: 100%;
  margin: auto;
`;

const Main = ({ status }) => {
  let content;
  
  switch (status) {
    case 'SLEEPING':
    case 'JOINING':
      content = <Landing />;
      break;
    case 'PICKING':
      content = <Picking />;
      break;
    case 'SHOWING':
      content = <Winner />;
      break;
    default:
      content = '';
  }
  console.log(status)
  return (
    <Wrapper>
      <Content>
        {content}
      </Content>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  status: getStatus(state),
});

export default connect(mapStateToProps)(Main);
