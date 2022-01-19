import styled from "styled-components";

const RectangleButton = styled.button`
  padding: 1rem;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  background-color: ${({ theme, lightGrey }) =>
    lightGrey ? theme.color.lightGrey : theme.color.darkGrey};
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;

  &:focus {
    box-shadow: 0 4px 4px ${({ theme }) => theme.color.lightGreen};
  }

  &:hover {
    box-shadow: 0 4px 4px ${({ theme }) => theme.color.lightGreen};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 4px 4px ${({ theme }) => theme.color.lightGreen};
  }

  &:disabled {
    box-shadow: none;
  }
`;

export default RectangleButton;
