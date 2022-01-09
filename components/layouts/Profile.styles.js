import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 4rem 0 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 2rem 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;

    span:first-child {
      margin-right: 0.5rem;
    }
  }
`;

export const UserDetailsWrapper = styled.div`
  margin: 0 0 3rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  div {
    margin: 0 1rem 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      width: min-content;
      text-align: center;
      font-size: ${({ theme }) => theme.fontSize.xl};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
  }
`;
