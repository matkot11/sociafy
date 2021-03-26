import styled from 'styled-components';

const Paragraph = styled.p`
  font-weight: ${({ theme }) => theme.light};
  font-size: ${({ theme }) => theme.fontSize.m};
`;

export default Paragraph;
