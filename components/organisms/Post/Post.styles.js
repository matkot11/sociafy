import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserWrapper = styled.div`
  padding: 2rem 0 2rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;

  div {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;

    span:nth-child(1) {
      font-size: ${({ theme }) => theme.fontSize.s};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }

    span:nth-child(2) {
      font-size: ${({ theme }) => theme.fontSize.xxs};
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 24rem;
  object-fit: cover;
`;

export const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  hr {
    border-top: 1px solid ${({ theme }) => theme.color.lightGrey};
  }

  div {
    padding: 0.7rem;
  }

  div:first-child {
    align-self: flex-end;
    display: flex;

    button {
      margin-right: 2rem;
    }
  }

  div:last-child {
    display: flex;
    justify-content: space-around;
  }
`;
