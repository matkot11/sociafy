import styled from "styled-components";

const RoundedButton = styled.div`
  padding: 0.8rem;
  width: max-content;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-color: ${({ theme }) => theme.color.lightGrey};
  border-radius: 5rem;
  border: solid 2px ${({ theme }) => theme.color.black};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
`;

export default RoundedButton;
