import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;

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
