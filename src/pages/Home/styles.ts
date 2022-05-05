import styled from 'styled-components';

export const Container = styled.div`
  justify-content: space-between;
  margin: 20px auto 0;
  padding: 20px;
  text-align: center;
  align-items: center;
  max-width: 900px;

  @media (max-width: 900px) {
    margin: 5px auto 0;
    padding: 5px;
  }
`;

export const PaginationContainer = styled.div`
  justify-content: space-evenly;
  margin: 20px auto 0;
  padding: 20px;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const CurrentPage = styled.div`
  margin-top: 18px;
  max-width: 150px;
`;
