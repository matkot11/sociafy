import styled from "styled-components";

export const Wrapper = styled.button`
  padding: 2rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.color.lightGrey};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  span {
    margin-right: 2rem;
  }
`;
