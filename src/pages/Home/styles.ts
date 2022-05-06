import styled from 'styled-components';

export const Container = styled.div`
  justify-content: space-between;
  margin: 20px auto 0;
  padding: 20px;
  text-align: center;
  align-items: center;
  max-width: 700px;

  @media (max-width: 900px) {
    margin: 5px auto 0;
    padding: 5px;
  }

  h1 {
    margin: 32px 0;
  }

  ul {
    margin: 32px 0;
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

export const CurrentPageContainer = styled.div`
  max-width: 150px;
`;

export const InputContainer = styled.div`
  justify-content: space-between;
  margin: 20px auto;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;

  div {
    margin-right: 10px;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  background: #fff;
  font-size: 15px;
  border-radius: 10px;
  border: 2px solid #eeeef6;
  margin: 12px;
  list-style-type: none;
  align-items: center;
  display: flex;
  padding: 10px;
  color: #3d3d4d;
`;

export const ErrorContainer = styled.div`
  border-radius: 10px;
  border: 2px solid #eeeef6;
  background-color: #eeeef6;
  padding: 8px;
  p {
    color: #3d3d4d;
  }
`;

export const ResultsContainer = styled.div``;
