import styled from "styled-components";

export const Wrapper = styled.div`
  width: 90%;

  input {
    padding: 0.5rem 1rem 0.5rem 1rem;
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.color.black};
    transition: border-bottom 0.2s;

    &:focus {
      outline: none;
      border-bottom: 2px solid ${({ theme }) => theme.color.lightGreen};
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.size.xxs}) {
    max-width: 40rem;
  }
`;

export const ResultList = styled.ul`
  width: 100%;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-top: 2rem;
  }
`;
