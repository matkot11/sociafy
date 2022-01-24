import Link from "next/link";
import Icon from "../../atoms/Icon/Icon";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    padding: 1rem 1rem 1rem 2rem;
  }
`;

const ButtonsWrapper = styled.div`
  & > * {
    margin-left: 1.5rem;
  }

  @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
    display: none;
  }
`;

const NavbarTop = ({ onClick }) => (
  <Wrapper>
    <Link href="/" passHref>
      <Icon
        iconPath="/icons/logo.svg"
        name="Logo"
        layout="fixed"
        imageWidth={100}
        imageHeight={30}
      />
    </Link>
    <ButtonsWrapper>
      <Link href="/search" passHref>
        <Icon
          iconPath="/icons/magnifier.svg"
          name="Magnifier"
          imageWidth={24}
          imageHeight={24}
        />
      </Link>
      <button onClick={onClick}>
        <Icon
          iconPath="/icons/menu.svg"
          name="Menu"
          imageWidth={24}
          imageHeight={24}
        />
      </button>
    </ButtonsWrapper>
  </Wrapper>
);

NavbarTop.propTypes = {
  onClick: PropTypes.func,
};

export default NavbarTop;
