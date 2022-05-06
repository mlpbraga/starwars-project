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

export const CurrentPage = styled.div`
  margin-top: 16px;
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

export const ListItem = styled.div`
  border: 1px solid black;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  background: #fff;
  font-size: 15px;
  border-radius: 10px;
  border: 2px solid #eeeef6;

  li {
    list-style-type: none;
    align-items: center;
    flex: 1;
    padding: 10px 0;

    small {
      color: #a6a6a6;
    }
    p {
      color: #3d3d4d;
    }
  }
  & + li {
    margin-top: 16px;
  }
`;
