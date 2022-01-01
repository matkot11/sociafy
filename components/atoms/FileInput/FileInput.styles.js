import styled from "styled-components";

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.s};
  background-color: ${({ theme }) => theme.color.lightGrey};
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;

  &:focus {
    transform: scale(1.01);
    box-shadow: 0 4px 4px ${({ theme }) => theme.color.lightGreen};
  }

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 4px ${({ theme }) => theme.color.lightGreen};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 4px 4px ${({ theme }) => theme.color.lightGreen};
  }

  input[type="file"] {
    display: none;
  }

  span {
    margin-right: 1rem;
  }
`;
