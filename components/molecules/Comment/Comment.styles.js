import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  div {
    padding: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.color.lightGrey};
    border-radius: 5px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    p {
      margin-right: 1rem;
      font-size: ${({ theme }) => theme.fontSize.s};
      word-wrap: break-word;
    }
  }

  span {
    margin-bottom: 0.3rem;
    align-self: flex-end;
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
