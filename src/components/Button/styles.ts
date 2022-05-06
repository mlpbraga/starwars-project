import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  color: #312e38;
  padding: 0 16px;
  max-width: 150px;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }

  &:disabled {
    background: ${shade(0.2, '#cccccc')};
    cursor: not-allowed;
  }
`;
