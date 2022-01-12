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
`;

export const ResultList = styled.ul`
  width: 100%;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  padding: 0;

  & > * {
    margin-top: 2rem;
  }
`;

export const ResultItem = styled.li`
  width: 100%;
  list-style: none;
  box-shadow: ${({ isHighlighted, theme }) =>
    isHighlighted
      ? `0 4px 4px ${theme.color.lightGreen}`
      : "0 4px 4px rgba(0, 0, 0, 0.25)"};
`;
