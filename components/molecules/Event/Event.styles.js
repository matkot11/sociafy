import styled from "styled-components";

export const Wrapper = styled.div`
  width: 90%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.lightGrey};
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  div {
    width: 100%;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      span:first-child {
        font-size: ${({ theme }) => theme.fontSize.m};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
      }

      span:last-child {
        font-size: ${({ theme }) => theme.fontSize.xxs};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
      }
    }
  }
`;
