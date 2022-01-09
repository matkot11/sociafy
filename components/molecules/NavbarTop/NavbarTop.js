import Link from "next/link";
import Image from "next/image";
import IconLink from "../../atoms/IconLink/IconLink";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    a {
      margin-left: 1.5rem;
    }
  }
`;

const NavbarTop = ({ onClick }) => (
  <Wrapper>
    <Image
      src="/icons/logo.svg"
      alt="Logo"
      layout="fixed"
      width={100}
      height={30}
    />
    <div>
      <Link href="/search" passHref>
        <IconLink
          iconPath="/icons/magnifier.svg"
          name="Magnifier"
          width={24}
          height={24}
        />
      </Link>
      <button onClick={onClick}>
        <IconLink
          iconPath="/icons/menu.svg"
          name="Menu"
          width={24}
          height={24}
        />
      </button>
    </div>
  </Wrapper>
);

export default NavbarTop;
