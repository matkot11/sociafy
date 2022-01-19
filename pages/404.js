import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const Custom404 = () => (
  <Wrapper>
    <span>Page not found</span>
    <Image src="/svg/notFound.svg" alt="Not Found" width={300} height={500} />
  </Wrapper>
);

export default Custom404;
