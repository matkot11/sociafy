import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 1rem 0 1rem 0;
  }
`;

export const DeleteButtonWrapper = styled.div`
  margin: 2rem 2rem 0 0;
  align-self: flex-end;
`;

export const ImageWrapper = styled.div`
  margin-top: 5rem;
`;

export const Date = styled.span`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const Title = styled.span`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
`;

export const CreatedBy = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const ButtonWrapper = styled.div`
  width: 80%;

  button:last-child {
    margin-top: 2rem;

    span {
      margin-right: 1rem;
    }
  }
`;
