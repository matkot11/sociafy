import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.darkGreen};
`;

export const UpperInnerWrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    button:first-child {
      margin-right: 1.5rem !important;
    }
  }
`;
