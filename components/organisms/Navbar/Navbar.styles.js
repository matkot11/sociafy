import styled from "styled-components";

export const Wrapper = styled.nav`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.darkGreen};
`;
