import styled, { createGlobalStyle } from 'styled-components';
import loadingSpinner from '../assets/loading.svg';

export const Loading = styled.div`
  background: url(${loadingSpinner}) no-repeat center;
  color: transparent;
  height: 80px;
  background-size: 10%;
`;

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    body {
      background: #312E38;
      color: #FFF;
      -webkit-font-smoothin: antialiased;
    }
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5 , h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
