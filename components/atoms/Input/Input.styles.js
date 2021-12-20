import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  label {
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    transition: all 0.3s ease-in-out;
    color: ${({ theme }) => theme.color.darkGrey};
    font-size: ${({ theme }) => theme.fontSize.s};
  }

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

  input:focus ~ label,
  input:valid ~ label {
    transform: translate(-2px, -180%);
  }
`;
