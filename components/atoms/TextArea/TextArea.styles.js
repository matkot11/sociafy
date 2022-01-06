import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;

  textarea {
    padding: 1.5rem;
    width: 100%;
    min-height: 15rem;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    border: none;
    border-radius: 5px;
    transition: box-shadow 0.2s;
    resize: none;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    &::placeholder {
      color: ${({ theme }) => theme.color.black};
    }

    &:focus {
      outline: none;
      box-shadow: 0 4px 4px ${({ theme }) => theme.color.lightGreen};
    }
  }
`;
